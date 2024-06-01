const request = require('supertest');
const app = require('../src/app'); 
const Mesa = require('../src/models/Mesa');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


//COMPROBAR QUE NO SE CREE EL MISMO DOS VECES (EN TODOS LOS TEST)

const obtenerIdPorNumeroMesa = async (numeroMesa) => {
    try {
      // Buscar el usuario por su nombre de usuario
      const mesa = await Mesa.findOne({ numero_mesa: numeroMesa });
      
      // Verificar si se encontró el usuario
      if (!mesa) {
        throw new Error("Mesa no encontrada");
      }
      
      // Retornar el ObjectId del usuario encontrado
      return mesa._id;
    } catch (error) {
      throw new Error("Error al obtener el ObjectId de la mesa: " + error.message);
    }
  };

describe('Pruebas para la API de mesas', () => {
let server;
  let agent;
  
  beforeAll(async () => {

      const URI = process.env.MONGODB_URI || 'mongodb+srv://i12hurel:admin@clusterpruebas.jelzqjk.mongodb.net/test';
      await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

      server = app.listen(7000, () => {
          console.log('Test server running on port 7000');
      });
      agent = request.agent(server); // Agente para manejar la sesión

    });
      
     afterAll(async () => {
        // Desconectarse de la base de datos de prueba
        await mongoose.disconnect();
        server.close();
    });

    it('Crear una mesa (login con cliente)', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass",
            mesa: "665b2732d0ed825046ea31bd"
          });
    
          expect(loginResponse.status).toBe(200);
          expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
    
        
        const nuevaMesa = {
            numero_mesa: 2,
            estado: 'Libre',
            capacidad: 6
        }
        const response = await agent.post('/api/mesa').send(nuevaMesa);
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Forbidden: Insufficient privilege');

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass"
        });

        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    
    it('Crear una mesa (login con admin)', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
    
          expect(loginResponse.status).toBe(200);
          expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
    
        
        const nuevaMesa = {
            numero_mesa: 2,
            estado: 'Libre',
            capacidad: 6
        }
        const response = await agent.post('/api/mesa').send(nuevaMesa);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("La mesa ha sido creada");
        
        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
            });
    
            expect(logoutResponse.status).toBe(200);
            expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Crear una mesa existente', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
    
          expect(loginResponse.status).toBe(200);
          expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        const nuevaMesa = {
            numero_mesa: 2,
            estado: 'Libre',
            capacidad: 6
        }
        const response = await agent.post('/api/mesa').send(nuevaMesa);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Ya existe una mesa con este número");
        
        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
            });
    
            expect(logoutResponse.status).toBe(200);
            expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Devolver las mesas existentes', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        const response = await agent.get('/api/mesa');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
            });
    
        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Devolver una mesa existente', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
    
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
    
        
        const objectId = await obtenerIdPorNumeroMesa(1);
        const url = '/api/mesa/' + objectId;
        const response = await agent.get(url);
        expect(response.status).toBe(200);
        //console.log(response.body)
        expect(typeof response.body).toBe('object');
       // expect(Array.isArray(response.body)).toBe(true);

       const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "admin",
        contraseña: "admin"
        });

        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Devolver una mesa inexistente', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
    
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        const response = await agent.get('/api/mesa/665b2732d0ed825046gr31bd');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Mesa no encontrada");

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
            });
    
        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Modificar una mesa existente (login con cliente)', async () => {
        
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass",
            mesa:"665b2732d0ed825046ea31bd"
          });
    
          expect(loginResponse.status).toBe(200);
          expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        const nuevaMesa = {
            numero_mesa: 2,
            estado: 'Ocupada',
            capacidad: 7
        }
        const objectId = await obtenerIdPorNumeroMesa(2);
        const url = '/api/mesa/' + objectId;
        const response = await agent.put(url).send(nuevaMesa);
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Forbidden: Insufficient privilege');

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass"
            });
    
        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Modificar una mesa existente (login con admin)', async () => {
        
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
    
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        const nuevaMesa = {
            numero_mesa: 2,
            estado: 'Ocupada',
            capacidad: 7
        }
        const objectId = await obtenerIdPorNumeroMesa(2);
        const url = '/api/mesa/' + objectId;
        const response = await agent.put(url).send(nuevaMesa);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('La mesa ha sido actualizada');

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
            });
    
        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Modificar una mesa inexistente', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
    
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        const nuevaMesa = {
            numero_mesa: 2,
            estado: 'Ocupada',
            capacidad: 7
        }
        
        const response = await agent.put('/api/mesa/665b2732d0ed825046gr31bd').send(nuevaMesa);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Mesa no encontrada");

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
            });
    
        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Eliminar una mesa existente (login con cliente)', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass",
            mesa:"665b2732d0ed825046ea31bd"
          });
    
          expect(loginResponse.status).toBe(200);
          expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        
        const objectId = await obtenerIdPorNumeroMesa(2);
        const url = '/api/mesa/' + objectId;
        const response = await agent.delete(url);
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Forbidden: Insufficient privilege');

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass"
            });
    
        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');

    });

    it('Eliminar una mesa existente (login con admin)', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
    
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        const objectId = await obtenerIdPorNumeroMesa(2);
        const url = '/api/mesa/' + objectId;
        const response = await agent.delete(url);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('La mesa ha sido eliminada');

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
            });
    
        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');

    });

    it('Eliminar una mesa inexistente', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
    
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        const response = await agent.delete('/api/mesa/665b2732d0ed825046gr31bd');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Mesa no encontrada");

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
            });
    
        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    
    });




})
