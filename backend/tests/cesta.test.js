const request = require('supertest');
const app = require('../src/app'); 
const Producto = require('../src/models/Producto');
const mongoose = require('mongoose');

const obtenerIdPorNombreProducto = async (nombreProd) => {
    try {
      // Buscar el usuario por su nombre de usuario
      const producto = await Producto.findOne({ nombre: nombreProd });
      
      // Verificar si se encontró el usuario
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      
      // Retornar el ObjectId del usuario encontrado
      return producto._id;
    } catch (error) {
      throw new Error("Error al obtener el ObjectId del producto: " + error.message);
    }
  };

describe('Pruebas para la API de cesta', () => {
  let server;
  let agent;
    
    beforeAll(async () => {

        const URI = process.env.MONGODB_URI || 'mongodb+srv://i12hurel:admin@clusterpruebas.jelzqjk.mongodb.net/test';
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  
        server = app.listen(4000, () => {
            console.log('Test server running on port 4000');
        });
        agent = request.agent(server); // Agente para manejar la sesión
  
      });
  
    afterAll(async () => {
        await mongoose.disconnect();
        server.close();
    });



    it('Añadir un producto existente a la cesta', async () => {


      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass",
        mesa:"665b2732d0ed825046ea31bd"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

      const objectId = await obtenerIdPorNombreProducto("Fanta de limon");
      const response = await agent.post('/api/cesta').send({ productoId: objectId, cantidad: 1 });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Producto agregado a la cesta');

      const logoutResponse2 = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass"
      });
  
      expect(logoutResponse2.status).toBe(200);
      expect(logoutResponse2.body.message).toBe('Sesión cerrada exitosamente');

    });


    it('Añadir un producto inexistente a la cesta', async () => {

      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass",
        mesa:"665b2732d0ed825046ea31bd"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

    const response = await agent.post('/api/cesta').send({ productoId: "665b2732d0ed825046ea31bd", cantidad: 1 });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Producto no encontrado');

    const logoutResponse2 = await agent.post('/api/usuarios/auth/logout').send({
      nombre_usuario: "i12hurel",
      contraseña: "pass"
    });

    expect(logoutResponse2.status).toBe(200);
    expect(logoutResponse2.body.message).toBe('Sesión cerrada exitosamente');

    });

    it('Devolver la cesta', async () => {
      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass",
        mesa:"665b2732d0ed825046ea31bd"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

      const response = await agent.get('/api/cesta');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(false);
      
      const logoutResponse2 = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass"
      });
  
      expect(logoutResponse2.status).toBe(200);
      expect(logoutResponse2.body.message).toBe('Sesión cerrada exitosamente');

    });

    it('Modificar un producto existente en la cesta', async () => {
      
      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass",
        mesa:"665b2732d0ed825046ea31bd"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

      const objectId = await obtenerIdPorNombreProducto("Fanta de limon");
      const response = await agent.post('/api/cesta').send({ productoId: objectId, cantidad: 1 });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Producto agregado a la cesta');

      const url = '/api/cesta/' + objectId;
      const response2 = await agent.put(url).send({cantidad: 3});
      expect(response2.status).toBe(200);
      expect(response2.body.message).toBe('Cantidad de producto actualizada en la cesta');

      const logoutResponse2 = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass"
      });
  
      expect(logoutResponse2.status).toBe(200);
      expect(logoutResponse2.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Modificar un producto inexistente en la cesta', async () => {
      
      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass",
        mesa:"665b2732d0ed825046ea31bd"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

      const response = await agent.put('/api/cesta/665b2732d0ed825046ea31bd').send({cantidad: 5});
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Producto no encontrado en la cesta');

      const logoutResponse2 = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass"
      });
  
      expect(logoutResponse2.status).toBe(200);
      expect(logoutResponse2.body.message).toBe('Sesión cerrada exitosamente');
    });
     
    it('Eliminar un producto existente en la cesta', async () => {
      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass",
        mesa:"665b2732d0ed825046ea31bd"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

      const objectId = await obtenerIdPorNombreProducto("Fanta de limon");
      const response = await agent.post('/api/cesta').send({ productoId: objectId, cantidad: 1 });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Producto agregado a la cesta');

      const url = '/api/cesta/' + objectId;
      const response2 = await agent.delete(url);
      expect(response2.status).toBe(200);
      expect(response2.body.message).toBe('Producto eliminado de la cesta');

      const logoutResponse2 = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass"
      });
  
      expect(logoutResponse2.status).toBe(200);
      expect(logoutResponse2.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Eliminar un producto inexistente en la cesta', async () => {
      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass",
        mesa:"665b2732d0ed825046ea31bd"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
      const response = await agent.delete('/api/cesta/nestea');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Producto no encontrado en la cesta');


      const logoutResponse2 = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "i12hurel",
        contraseña: "pass"
      });
  
      expect(logoutResponse2.status).toBe(200);
      expect(logoutResponse2.body.message).toBe('Sesión cerrada exitosamente');
    });
    

})