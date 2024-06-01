const request = require('supertest');
const app = require('../src/app'); 
const Comanda = require('../src/models/Comanda');
const mongoose = require('mongoose');

const obtenerIdPorFechaComanda = async (fechaComanda) => {
    try {
        const comanda = await Comanda.findOne({ fecha: fechaComanda });
        if (!comanda) {
            throw new Error("Comanda no encontrada");
        }
        return comanda._id;
    } catch (error) {
        throw new Error("Error al obtener el ObjectId de la comanda: " + error.message);
    }
};

describe('Pruebas para la API de comandas', () => {
    let server;
  let agent;
    
    beforeAll(async () => {

        const URI = process.env.MONGODB_URI || 'mongodb+srv://i12hurel:admin@clusterpruebas.jelzqjk.mongodb.net/test';
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  
        server = app.listen(8000, () => {
            console.log('Test server running on port 8000');
        });
        agent = request.agent(server); // Agente para manejar la sesión
  
      });
  
    afterAll(async () => {
        await mongoose.disconnect();
        server.close();
    });


    it('Crear una comanda', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass",
            mesa: "665b2732d0ed825046ea31bd"
        });
  
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        const nuevaCom = {
            id_usuario: "6659afa6b1974d57abcff5df",
            productos: [
                { producto: "665b31532bf192d76ed8cdfc", cantidad: 2 },
                { producto: "665b3177165e8bf4b1b02a8a", cantidad: 3 }
            ],
            hora: "12:00",
            fecha: new Date("2024-12-10"),
            comentarios: "comanda de prueba",
            precio_total: 25.10, 
            mesa: 1,
            estado: "porServir"
        };
        
        const response = await agent.post('/api/comandas').send(nuevaCom);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Comanda creada correctamente');

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass"
          });
      
          expect(logoutResponse.status).toBe(200);
          expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');


    });

    it('Devolver las comandas existentes', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
        });
  
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        
        const response = await agent.get('/api/comandas');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
      
          expect(logoutResponse.status).toBe(200);
          expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Devolver una comanda existente', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass",
            mesa: "665b2732d0ed825046ea31bd"
        });
  
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        const objectId = await obtenerIdPorFechaComanda("2024-12-10");
        const url = '/api/comandas/' + objectId;
        const response = await agent.get(url);
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass"
          });
      
          expect(logoutResponse.status).toBe(200);
          expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');

    });

    it('Devolver una comanda inexistente', async () => {
        
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass",
            mesa: "665b2732d0ed825046ea31bd"
        });
  
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

        const response = await agent.get('/api/comandas/665b2732d0ed825046ea31bd');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Comanda no encontrada');

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass"
          });
      
          expect(logoutResponse.status).toBe(200);
          expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');

    });

    /*it('Modificar una comanda existente', async () => {
        const objectId = await obtenerIdPorFechaComanda("2024-12-10");
        const nuevaCom = {
            id_usuario: "1234567890abcdef12345678",
            productos: ["producto1", "producto2"],
            hora: "12:00",
            fecha: "2024-12-10",
            comentarios: "comanda de prueba cambiada",
            precio_total: 25.10, 
            mesa: "mesa1",
            estado: "servida"
        };
        const url = '/api/comandas/' + objectId;
        const response = await request(app).put(url).send(nuevaCom);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Comanda actualizada correctamente');
    });

    it('Modificar una comanda inexistente', async () => {
        const nuevaCom = {
            id_usuario: "1234567890abcdef12345678",
            productos: ["producto1", "producto2"],
            hora: "12:00",
            fecha: "2024-12-10",
            comentarios: "comanda de prueba inexistente",
            precio_total: 25.10, 
            mesa: "mesa1",
            estado: "porServir"
        };
        const response = await request(app).put('/api/comandas/12345').send(nuevaCom);
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error al actualizar la comanda: Comanda no encontrada');
    });

    */

    it('Eliminar una comanda existente(login con cliente)', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass",
            mesa: "665b2732d0ed825046ea31bd"
        });
  
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        const objectId = await obtenerIdPorFechaComanda("2024-12-10");
        const url = '/api/comandas/' + objectId;
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

    it('Eliminar una comanda existente (login con admin)', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
        });
  
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        const objectId = await obtenerIdPorFechaComanda("2024-12-10");
        const url = '/api/comandas/' + objectId;
        const response = await agent.delete(url);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Comanda eliminada correctamente');

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
      
          expect(logoutResponse.status).toBe(200);
          expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');



        
    });

    it('Eliminar una comanda inexistente', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
        });
  
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
        
        const response = await agent.delete('/api/comandas/665b3177165e8bf4b1b02a8a');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Comanda no encontrada');

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
      
          expect(logoutResponse.status).toBe(200);
          expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');


    });
});
