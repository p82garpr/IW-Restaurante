const request = require('supertest');
const app = require('../src/app'); 
const Producto = require('../src/models/Producto');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

//AÑADIR QUE NO SE PUEDA CREAR EL MSIMO PRODUCTO DOS VECES
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

describe('Pruebas para la API de productos', () => {
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

    it('Crear un nuevo producto (login con cliente)', async () => {

        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass",
            mesa: "665b2732d0ed825046ea31bd"
        });
  
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

        const nuevoProd = {
            nombre : "Fanta de naranja",
            precio : 2,
            imagen: " ",
            categoria: "bebida",
            descripcion: " ",
            ingredientes: " ",
        };
        const response = await agent.post('/api/productos').send(nuevoProd);
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Forbidden: Insufficient privilege');

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass"
          });
      
          expect(logoutResponse.status).toBe(200);
          expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });
    it('Crear un nuevo producto (login con admin)', async () => {

        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
        });
  
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

        const nuevoProd = {
            nombre : "Fanta de naranja",
            precio : 2,
            imagen: " ",
            categoria: "bebida",
            descripcion: " ",
            ingredientes: " ",
        };
        const response = await agent.post('/api/productos').send(nuevoProd);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("El producto ha sido creado");

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
      
          expect(logoutResponse.status).toBe(200);
          expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    

   it('Crear un producto existente', async () => {
    
    const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "admin",
        contraseña: "admin"
    });

    
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');     
    
    const nuevoProd = {
                nombre : "Fanta de naranja",
                precio : 2,
                imagen: " ",
                categoria: "bebida",
                descripcion: " ",
                ingredientes: " ",
            };

        const response = await agent.post('/api/productos').send(nuevoProd);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Ya existe un producto con este nombre");

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
      
          expect(logoutResponse.status).toBe(200);
          expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    }); 

    it('Crear un producto con una categoria inexistente', async () => {
        
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
        });
    
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso'); 

        const nuevoProd = {
            nombre : "Fanta de limón",
            precio : 2,
            imagen: " ",
            categoria: "segundo",
            descripcion: " ",
            ingredientes: " ",
        };
        const response = await agent.post('/api/productos').send(nuevoProd);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("La categoría especificada no existe");

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
      
          expect(logoutResponse.status).toBe(200);
          expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Devolver todos los productos filtrados por categoría existente', async () => {

        const response = await request(app).get('/api/productos/categoria/postre');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Devolver todos los productos filtrados por categoría inexistente', async () => {
        const objectId = new ObjectId("5f1d7f1a1e4b1a1b1c1d2f2f");
        const url = '/api/productos/categoria/' + objectId;
        const response = await agent.get(url);
        expect(response.status).toBe(401);
        
    }); 

    it('Devolver un producto existente', async () => {    
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass",
            mesa:"665b2732d0ed825046ea31bd"
        });
    
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso'); 

        const objectId = await obtenerIdPorNombreProducto("Fanta de naranja");
        const url = '/api/productos/' + objectId;
        const response = await agent.get(url);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass"
        });

        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Devolver un producto inexistente', async () => {    
        
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass",
            mesa:"665b2732d0ed825046ea31bd"
        });
    
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso'); 
        
        const url = '/api/productos/12345'
        const response = await agent.get(url);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Producto no encontrado");

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass"
        });

        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    
    it('Actualizar un producto existente (login con cliente)', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass",
            mesa:"665b2732d0ed825046ea31bd"
        });
    
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso'); 
        
        const nuevoProd = new Producto({
            nombre : 'Fanta de naranja',
            precio : 10,
            categoria: 'bebida'
        });
        const objectId = await obtenerIdPorNombreProducto("Fanta de naranja");
        const url = '/api/productos/' + objectId;
        const response = await agent.put(url).send(nuevoProd);
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Forbidden: Insufficient privilege');


        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass"
        });

        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });


    it('Actualizar un producto existente (login con admin)', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
        });
    
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso'); 
        
        const nuevoProd = new Producto({
            nombre : 'Fanta de naranja',
            precio : 10,
            categoria: 'bebida'
        });
        const objectId = await obtenerIdPorNombreProducto("Fanta de naranja");
        const url = '/api/productos/' + objectId;
        const response = await agent.put(url).send(nuevoProd);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("El producto ha sido actualizado");

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
          });
      
          expect(logoutResponse.status).toBe(200);
          expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    

    it('Actualizar un producto inexistente', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
        });
    
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso'); 
        const url = '/api/productos/12345';
        const response = await agent.put(url).send(" ");
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Producto no encontrado");

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
        });

        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Eliminar un producto existente (login con cliente)', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "i12hurel",
            contraseña: "pass",
            mesa:"665b2732d0ed825046ea31bd"
        });
    
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso'); 

        const objectId = await obtenerIdPorNombreProducto("Fanta de naranja");
        const url = '/api/productos/' + objectId;
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

    it('Eliminar un producto existente (login con admin)', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
        });
    
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso'); 

        const objectId = await obtenerIdPorNombreProducto("Fanta de naranja");
        const url = '/api/productos/' + objectId;
        const response = await agent.delete(url);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Producto ha sido eliminado");
        
        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
        });

        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    it('Eliminar un producto inexistente', async () => {
        const loginResponse = await agent.post('/api/usuarios/auth/login').send({
            nombre_usuario: "admin",
            contraseña: "admin"
        });
    
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

        const url = '/api/productos/carne';
        const response = await agent.delete(url);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Producto no encontrado");

        const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
            nombre_usuario: "admin",
            contraseña: "admin"
        });

        expect(logoutResponse.status).toBe(200);
        expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    }); 

    

})