const request = require('supertest');
const app = require('../src/app'); 
const Usuario = require('../models/Usuario');
//CREAR UN MÉTODO PARA OBTENER EL ID A PARTIR DEL USERNAMEEN EL BACKEND

describe('Pruebas para la API de usuarios', () => {
    beforeAll(async () => {
        // Conectarse a la base de datos de prueba
        await mongoose.connect('mongodb://localhost:27017/pruebas', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        });
      
        // Insertar datos de prueba en la base de datos
        await Usuario.create({  nombre_usuario: 'i12hurel',
            nombre: 'Laura',
            apellido: 'Huertes',
            contraseña: 'pass',
            fecha_nacimiento: '2003-12-01',
            privilegio: 1,
            rol: 'cliente',
            cliente_info: {
                saldo: 0,
                id_mesa: null
            }, });
      });
      
    afterAll(async () => {
        // Eliminar todos los datos de prueba de la base de datos
        await Usuario.deleteMany({});
        
        // Desconectarse de la base de datos de prueba
        await mongoose.disconnect();
    });

    it('Devolver todos los usuarios', async () => {
        const response = await request(app).get('/api/usuarios');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Crear un nuevo usuario', async () => {
        const nuevoUsuario = {
        nombre_usuario: 'p82ceali',
        nombre: 'Isaac',
        apellido: 'Cejudo',
        contraseña: 'pass',
        fecha_nacimiento: '2000-09-19',
        privilegio: 1,
        rol: 'cliente',
    };

    const response = await request(app).post('/api/usuarios').send(nuevoUsuario);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("El usuario ha sido creado");

    // Verificar si el usuario realmente ha sido creado en la base de datos
    const usuarioCreado = await Usuario.findOne({ nombre_usuario: nuevoUsuario.nombre_usuario });
    expect(usuarioCreado).toBeDefined();
  });

  it('Obtener un usuario específico', async () => {

    const response = await request(app).get('/api/usuarios/i12hurel');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();  
  });

  it('Eliminar un usuario específico', async () => {

    const response = await request(app).get('/api/usuarios/i12hurel');



  })

  
});
