const request = require('supertest');
const app = require('../src/app'); 
const Usuario = require('../src/models/Usuario');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

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

  it('Devolver todos los usuarios', async () => {
      // Primero inicia sesión para establecer la sesión
      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
          nombre_usuario: "admin",
          contraseña: "admin"
      });

      
      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

      // Ahora intenta acceder a la ruta protegida
      const response = await agent.get('/api/usuarios');
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
      //console.log(objectId)
      const url = '/api/usuarios/' + objectId;

      const response = await agent.put(url).send(UsuarioAct);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("El usuario ha sido actualizado");

    

    });

    it('Actualizar un usuario inexistente', async () => {

      const UsuarioAct = {
        nombre_usuario: 'p82ceali',
        nombre: 'Isachi',
        apellido: 'Cejudo',
        contraseña: 'pass',
        fecha_nacimiento: '2000-09-19'
      };
      
      const objectId = new ObjectId("5f1d7f1a1e4b1a1b1c1d2f2f");
      const url = '/api/usuarios/' + objectId;
      const response = await agent.put(url).send(UsuarioAct);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Usuario no encontrado");

    });

    it('Inicio de sesión de un usuario existente', async () => {
      const UsuarioAct = {
        nombre_usuario: 'p82ceali',
        contraseña: 'pass',
        mesa: 2
      };
    const response = await agent.post('/api/usuarios/auth/login/').send(UsuarioAct);
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
    const response = await agent.post('/api/usuarios/auth/login/').send(UsuarioAct);
    expect(response.status).toBe(402);
    expect(response.body.message).toBe('Credenciales incorrectas');

    });

    //COMPROBAR EL FALLO DE ESTAS FUNCION
    it('Inicio de sesión de un usuario inexistente', async () => {
      
    const response = await agent.post('/api/usuarios/auth/login/').send(" ");
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
      const response = await agent.post('/api/usuarios/auth/logout/').send(UsuarioAct);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Sesión cerrada exitosamente');
  
      });

      it('Cierre de sesión de un usuario inexistente', async () => {
        const response = await agent.post('/api/usuarios/auth/logout/').send(" ");
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error al cerrar sesión');
    
      }); //MIRAR EL USUARIO CONTROLLER PARA CORREGIR ERRORES 

    it('Eliminar un usuario específico', async () => {
      

      const objectId = await obtenerIdPorNombreUsuario("p82ceali");
      const url = '/api/usuarios/' + objectId;
      const response = await agent.delete(url);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("El usuario ha sido eliminado");
    }); 

    it('Eliminar un usuario inexistente', async () => {
      
      const url = '/api/usuarios/12345';
      const response = await agent.delete(url);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Usuario no encontrado");

      
    }); 

    

})