const request = require('supertest');
const app = require('../src/app'); 
const Usuario = require('../src/models/Usuario');
const mongoose = require('mongoose');

//QUE PASA CON LA FUNCION GETUSUARIOACTUAL, NNO ESTA EN ROUTE

const obtenerIdPorNombreUsuario = async (nombreUsuario) => {
  try {
    // Buscar el usuario por su nombre de usuario
    const usuario = await Usuario.findOne({ nombre_usuario: nombreUsuario });
    
    // Verificar si se encontró el usuario
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    
    // Retornar el ObjectId del usuario encontrado
    return usuario._id;
  } catch (error) {
    throw new Error("Error al obtener el ObjectId del usuario: " + error.message);
  }
};

describe('Pruebas para la API de usuarios', () => {
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

    });

    it('Crear un usuario existente', async () => {
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
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("El nombre de usuario ya está en uso");

    });

    it('Devolver todos los usuarios', async () => {
      const response = await request(app).get('/api/usuarios');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });


     /*it('Obtener un usuario específico', async () => {
      const objectId = await obtenerIdPorNombreUsuario("p82ceali");
      const url = '/api/usuarios/' + objectId;
      const response = await request(app).get(url);
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined();  
    });

    it('Obtener un usuario inexistente', async () => {
      const url = '/api/usuarios/12345';
      const response = await request(app).get(url);
      expect(response.status).toBe(404)
      expect(response.body.message).toBe("Usuario no encontrado");  
    }); */

    it('Actualizar un usuario existente', async () => {
      const UsuarioAct = {
        nombre_usuario: 'p82ceali',
        nombre: 'Isachi',
        apellido: 'Cejudo',
        contraseña: 'pass',
        fecha_nacimiento: '2000-09-19',
        privilegio: 1,
        rol: 'cliente',
      };

      const objectId = await obtenerIdPorNombreUsuario("p82ceali");
      const url = '/api/usuarios/' + objectId;

      const response = await request(app).put(url).send(UsuarioAct);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("El usuario ha sido actualizado");

    });

    it('Actualizar un usuario inexistente', async () => {
      const url = '/api/usuarios/12345';
      const response = await request(app).put(url).send(" ");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Usuario no encontrado");

    });

    it('Inicio de sesión de un usuario existente', async () => {
      const UsuarioAct = {
        nombre_usuario: 'p82ceali',
        nombre: 'Isachi',
        apellido: 'Cejudo',
        contraseña: 'pass',
        fecha_nacimiento: '2000-09-19',
        privilegio: 1,
        rol: 'cliente',
      };
    const response = await request(app).post('/api/usuarios/auth/login/').send(UsuarioAct);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Inicio de sesión exitoso');

    });

    it('Inicio de sesión de un usuario existente con constraseña errónea', async () => {
      const UsuarioAct = {
        nombre_usuario: 'p82ceali',
        nombre: 'Isachi',
        apellido: 'Cejudo',
        contraseña: 'contrasena',
        fecha_nacimiento: '2000-09-19',
        privilegio: 1,
        rol: 'cliente',
      };
    const response = await request(app).post('/api/usuarios/auth/login/').send(UsuarioAct);
    expect(response.status).toBe(402);
    expect(response.body.message).toBe('Credenciales incorrectas');

    });

    //COMPROBAR EL FALLO DE ESTAS FUNCION
    it('Inicio de sesión de un usuario inexistente', async () => {
      
    const response = await request(app).post('/api/usuarios/auth/login/').send(" ");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Usuario incorrecto');

    });

    it('Cierre de sesión de un usuario existente', async () => {
      const UsuarioAct = {
        nombre_usuario: 'p82ceali',
        nombre: 'Isachi',
        apellido: 'Cejudo',
        contraseña: 'contrasena',
        fecha_nacimiento: '2000-09-19',
        privilegio: 1,
        rol: 'cliente',
      };
      const response = await request(app).post('/api/usuarios/auth/logout/').send(UsuarioAct);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Sesión cerrada exitosamente');
  
      });

      it('Cierre de sesión de un usuario inexistente', async () => {
        const response = await request(app).post('/api/usuarios/auth/logout/').send(" ");
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error al cerrar sesión');
    
      }); //MIRAR EL USUARIO CONTROLLER PARA CORREGIR ERRORES

    it('Eliminar un usuario específico', async () => {
      const objectId = await obtenerIdPorNombreUsuario("p82ceali");
      const url = '/api/usuarios/' + objectId;
      const response = await request(app).delete(url);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("El usuario ha sido eliminado");
    });

    it('Eliminar un usuario inexistente', async () => {
      const url = '/api/usuarios/12345';
      const response = await request(app).delete(url);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Usuario no encontrado");
    }); 

    

})