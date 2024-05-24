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

describe('Pruebas para la API de productos', () => {
    beforeAll(async () => {
        const URI = process.env.MONGODB_URI
            ? process.env.MONGODB_URI
            : 'mongodb+srv://i12hurel:admin@clusterpruebas.jelzqjk.mongodb.net/'

          mongoose.connect(URI)

          const connection = mongoose.connection

          connection.once('open', ()=>{
              console.log('la base de datos ha sido conectada: ', URI);
          })
      
      });
      
     afterAll(async () => {
        // Desconectarse de la base de datos de prueba
        await mongoose.disconnect();
    });


    it('Crear un nuevo producto', async () => {
        const nuevoProd = {
            nombre : "Fanta de naranja",
            precio : 2,
            imagen: " ",
            categoria: "bebida",
            descripcion: " ",
            ingredientes: " ",
        };
        const response = await request(app).post('/api/productos').send(nuevoProd);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("El producto ha sido creado");
    });

   /* it('Crear un producto existente', async () => {
        const nuevoProd = new Producto({
            nombre : 'Fanta de naranja',
            precio : 2,
            categoria: 'bebida'
        });

        const response = await request(app).post('/api/productos').send(nuevoProd);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("El producto ya existe");
    }); */

    it('Crear un producto con una categoria inexistente', async () => {
        const nuevoProd = {
            nombre : "Fanta de limón",
            precio : 2,
            imagen: " ",
            categoria: "segundo",
            descripcion: " ",
            ingredientes: " ",
        };
        const response = await request(app).post('/api/productos').send(nuevoProd);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("La categoría especificada no existe");
    });

    it('Devolver todos los productos filtrados por categoría existente', async () => {
        
        const response = await request(app).get('/api/productos/categoria/postre');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Devolver todos los productos filtrados por categoría inexistente', async () => {
        const response = await request(app).get('/api/productos/categoria/segundo');
        expect(response.status).toBe(400);
    }); 

    it('Devolver un producto existente', async () => {    
        const objectId = await obtenerIdPorNombreProducto("Fanta de naranja");
        const url = '/api/productos/' + objectId;
        const response = await request(app).get(url);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('Devolver un producto inexistente', async () => {    
        const url = '/api/productos/12345'
        const response = await request(app).get(url);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Producto no encontrado");
    });

    it('Actualizar un producto existente', async () => {
        const nuevoProd = new Producto({
            nombre : 'Fanta de naranja',
            precio : 10,
            categoria: 'bebida'
        });
        const objectId = await obtenerIdPorNombreProducto("Fanta de naranja");
        const url = '/api/productos/' + objectId;
        const response = await request(app).put(url).send(nuevoProd);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("El producto ha sido actualizado");
    });

    it('Actualizar un producto inexistente', async () => {
        const url = '/api/productos/12345';
        const response = await request(app).put(url).send(" ");
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Producto no encontrado");
    });

    it('Eliminar un producto existente', async () => {
        const objectId = await obtenerIdPorNombreProducto("Fanta de naranja");
        const url = '/api/productos/' + objectId;
        const response = await request(app).delete(url);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Producto ha sido eliminado");
    });

    it('Eliminar un producto inexistente', async () => {
        const url = '/api/productos/carne';
        const response = await request(app).delete(url);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Producto no encontrado");
    }); 


})