const request = require('supertest');
const app = require('../src/app'); 
const Categoria = require('../src/models/Categoria');
const mongoose = require('mongoose');

const obtenerIdPorNombre = async (nombreCat) => {
  try {
    // Buscar el usuario por su nombre de categoria
    const categoria = await Categoria.findOne({ nombre: nombreCat });
    
    // Verificar si se encontró la categoria
    if (!categoria) {
      throw new Error("Categoría no encontrada");
    }
    
    // Retornar el ObjectId de la categoria encontrado
    return categoria._id;
  } catch (error) {
    throw new Error("Error al obtener el ObjectId de la categoría: " + error.message);
  }
};

describe('Pruebas para la API de categorias', () => {
  
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
      // Desconectarse de la base de datos de prueba
      await mongoose.disconnect();
      server.close();
  });


    it('Devolver todos las categorías', async () => {
        const response = await agent.get('/api/categorias');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Devolver una categoría existente', async () => {
        const objectId = await obtenerIdPorNombre('postre');
        const url = '/api/categorias/' + objectId;
        const response = await agent.get(url);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('Devolver una categoría inexistente', async () => {
        const url = '/api/categorias/12345';
        const response = await agent.get(url);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Categoria no encontrada");
    });
   

})