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
      
    affterAll(async () => {
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
    const response = await request(app).post('/api/cesta').send(objectId,"2");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Producto agregado a la cesta');

    });

     

    

})