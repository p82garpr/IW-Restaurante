const request = require('supertest');
const app = require('../src/app'); 
const Comanda = require('../src/models/Comanda');
const mongoose = require('mongoose');

const obtenerIdPorFechaComanda = async (fechaComanda) => {
    try {
      // Buscar el usuario por su nombre de usuario
      const comanda = await Comanda.findOne({ fecha: fechaComanda });
      
      // Verificar si se encontró el usuario
      if (!comanda) {
        throw new Error("Comanda no encontrada");
      }
      
      // Retornar el ObjectId del usuario encontrado
      return comanda._id;
    } catch (error) {
      throw new Error("Error al obtener el ObjectId de la comanda: " + error.message);
    }
  };


describe('Pruebas para la API de comandas', () => {
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

    //hay que cambiar una cosa de backend
    it('Crear una comanda', async () => {
        const nuevaCom = {
            fecha: 2024-12-10,
            comentarios: "comanda de prueba",
            precio_total: 25.10, 
                
        }
        const response = await request(app).post('/api/comandas').send(nuevaCom);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Comanda creada correctamente');
    });

    it('Devolver las comandas existentes', async () => {
        const nuevaCom = {
            fecha: 2025-11-16,
            comentarios: "comanda de prueba2",
            precio_total: 30.99, 
                
        }
        const res = await request(app).post('/api/comandas').send(nuevaCom);
        const response = await request(app).get('/api/comandas');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Devolver una comanda existente', async () => {
        const objectId = await obtenerIdPorFechaComanda(2024-12-10);
        const url = '/api/comandas/' + objectId;
        const response = await request(app).get(url);
        expect(response.status).toBe(200);
        //console.log(response.body)
        expect(typeof response.body).toBe('object');
       // expect(Array.isArray(response.body)).toBe(true);
    });

    it('Devolver una comanda inexistente', async () => { //devuelve un mensaje que no es entendible
        
        const response = await request(app).get('/api/comandas/1234');
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Comanda no encontrada');
    });

    it('Modificar una comanda existente', async () => {
        const nuevaCom = {
            fecha: 2024-12-10,
            comentarios: "comanda de prueba cambiada",
            precio_total: 25.10, 
                
        }
        const objectId = await obtenerIdPorFechaComanda(2024-12-10);
        const url = '/api/comandas/' + objectId;
        const response = await request(app).put(url).send(nuevaCom);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Comanda actualizada correctamente');
    });

    it('Modificar una comanda inexistente', async () => {
        
        const response = await request(app).put('/api/comandas/12345').send(" ");
        expect(response.status).toBe(500);
        //expect(response.body.message).toBe('Comanda actualizada correctamente');
    });

    it('Eliminar una comanda existente', async () => {
        const objectId = await obtenerIdPorFechaComanda(2024-12-10);
        const url = '/api/comandas/' + objectId;
        const response = await request(app).delete(url);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Comanda eliminada correctamente');
    });

    it('Eliminar una mesa inexistente', async () => {

        const response = await request(app).delete('/api/comandas/12345');
        expect(response.status).toBe(500);
        //expect(response.body.message).toBe("Mesa no encontrada");
    });
    

    

   

    


})
