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
        // Eliminar todos los datos de prueba de la base de datos
        //await Usuario.deleteMany({});
        
        // Desconectarse de la base de datos de prueba
        await mongoose.disconnect();
    });


    it('Añadir un producto existente a la cesta', async () => {

        const nuevoProd = {
            nombre : "Fanta de naranja",
            precio : 2,
            imagen: " ",
            categoria: "bebida",
            descripcion: " ",
            ingredientes: " ",
        };
    
      const res = await request(app).post('/api/productos').send(nuevoProd);
      //expect(res.status).toBe(200);
      //expect(res.body.message).toBe("El producto ha sido creado");

      const objectId = await obtenerIdPorNombreProducto("Fanta de naranja");
      const response = await request(app).post('/api/cesta').send({ productoId: objectId, cantidad: 2 });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Producto agregado a la cesta');

    });


    it('Añadir un producto inexistente a la cesta', async () => {

    const response = await request(app).post('/api/cesta').send({ productoId: " ", cantidad: 2 });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Producto no encontrado');

    });

    it('Devolver la cesta', async () => {
      
      const response = await request(app).get('/api/cesta');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);

    });

    it('Modificar un producto existente en la cesta', async () => {
      
      const objectId = await obtenerIdPorNombreProducto("Fanta de naranja");
      const url = '/api/cesta/' + objectId;
      const response = await request(app).put(url).send({cantidad: 1});
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Cantidad de producto actualizada en la cesta');
    });

    it('Modificar un producto inexistente en la cesta', async () => {
      
      const response = await request(app).put('/api/cesta/5').send({cantidad: 5});
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Producto no encontrado en la cesta');
    });
     
    it('Eliminar un producto existente en la cesta', async () => {
      const objectId = await obtenerIdPorNombreProducto("Fanta de naranja");
      const url = '/api/cesta/' + objectId;
      const response = await request(app).delete(url);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Producto eliminado de la cesta');
    });

    it('Eliminar un producto inexistente en la cesta', async () => {

      const response = await request(app).delete('/api/cesta/5');
      expect(response.status).toBe(500);
    });
    

})