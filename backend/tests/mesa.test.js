const request = require('supertest');
const app = require('../src/app'); 
const Mesa = require('../src/models/Mesa');
const mongoose = require('mongoose');

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
    it('Crear una mesa', async () => {
        const nuevaMesa = {
            numero_mesa: 1,
            estado: 'libre',
            capacidad: 4
        }
        const response = await request(app).post('/api/mesa').send(nuevaMesa);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("La mesa ha sido creada");
    });

    it('Devolver las mesas existentes', async () => {
        const nuevaMesa = {
            numero_mesa: 2,
            estado: 'libre',
            capacidad: 3
        }
        const res = await request(app).post('/api/mesa').send(nuevaMesa);
        const response = await request(app).get('/api/mesa');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Devolver una mesa existente', async () => {
        const objectId = await obtenerIdPorNumeroMesa(1);
        const url = '/api/mesa/' + objectId;
        const response = await request(app).get(url);
        expect(response.status).toBe(200);
        console.log(response.body)
        expect(typeof response.body).toBe('object');
       // expect(Array.isArray(response.body)).toBe(true);
    });

    it('Devolver una mesa inexistente', async () => {
        const response = await request(app).get('/api/mesa/5');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Mesa no encontrada");
    });

    it('Modificar una mesa existente', async () => {
        const nuevaMesa = {
            numero_mesa: 1,
            estado: 'ocupada',
            capacidad: 4
        }
        const objectId = await obtenerIdPorNumeroMesa(1);
        const url = '/api/mesa/' + objectId;
        const response = await request(app).put(url).send(nuevaMesa);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('La mesa ha sido actualizada');
    });

    it('Modificar una mesa inexistente', async () => {
        
        const response = await request(app).put('api/mesa/5').send(" ");
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Mesa no encontrada");
    });

    it('Eliminar una mesa existente', async () => {
        const objectId = await obtenerIdPorNumeroMesa(1);
        const url = '/api/mesa/' + objectId;
        const response = await request(app).delete(url);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('La mesa ha sido eliminada');
    });

    it('Eliminar una mesa inexistente', async () => {

        const response = await request(app).delete('/api/mesa/5');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Mesa no encontrada");
    });


})
