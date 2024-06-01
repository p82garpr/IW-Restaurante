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

      server = app.listen(5000, () => {
          console.log('Test server running on port 5000');
      });
      agent = request.agent(server); // Agente para manejar la sesión

    });

  afterAll(async () => {
      await mongoose.disconnect();
      server.close();
  });

  it('Crear un nuevo usuario (no requiere login)', async () => { //no hace falta login
    const nuevoUsuario = {
      nombre_usuario: 'p82ceali',
      nombre: 'Isaac',
      apellido: 'Cejudo',
      contraseña: 'pass',
      fecha_nacimiento: '2000-09-19',
      rol: 'cliente',
  };

  const response = await request(app).post('/api/usuarios').send(nuevoUsuario);
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("El usuario ha sido creado");
});

  //LOGIN CON ADMIN

  it('Devolver todos los usuarios (login con admin)', async () => { 
      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
          nombre_usuario: "admin",
          contraseña: "admin"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

      const response = await agent.get('/api/usuarios');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true); 

      const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(logoutResponse.status).toBe(200);
      expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');

  });
  it('Devolver todos los usuarios (login con cliente)', async () => { 
    const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "p82ceali",
        contraseña: "pass",
        mesa:"665b2732d0ed825046ea31bd"
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

    const response = await agent.get('/api/usuarios');
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden: Insufficient privilege');


    const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
      nombre_usuario: "p82ceali",
      contraseña: "pass"
    });

    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');

});

    // LOGIN CON CLIENTE O ADMIN
    it('Obtener un usuario específico (login con admin)', async () => { 
      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

      const objectId = await obtenerIdPorNombreUsuario("p82ceali");
      const url = '/api/usuarios/' + objectId;
      const response = await agent.get(url);
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined(); 
      
      const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(logoutResponse.status).toBe(200);
      expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    });

    

    it('Obtener un usuario inexistente (login con admin)', async () => {

      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

      const objectId = new ObjectId("5f1d7f1a1e4b1a1b1c1d2f2f");
      const url = '/api/usuarios/' + objectId;
      const response = await agent.get(url);
      expect(response.status).toBe(404)
      expect(response.body.message).toBe("Usuario no encontrado"); 
      
      const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(logoutResponse.status).toBe(200);
      expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    }); 

    //LOGIN CON ADMIN

    it('Actualizar un usuario existente (login con admin)', async () => {

      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
      
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

      const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(logoutResponse.status).toBe(200);
      expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');

    });

    it('Actualizar un usuario inexistente (login con admin)', async () => {

      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

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

      const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(logoutResponse.status).toBe(200);
      expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');

    });

    it('Eliminar un usuario específico (login con cliente)', async () => {

      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "p82ceali",
        contraseña: "pass",
        mesa:"665b2732d0ed825046ea31bd"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
      
      const objectId = await obtenerIdPorNombreUsuario("p82ceali");
      const url = '/api/usuarios/' + objectId;
      const response = await agent.delete(url);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Forbidden: Insufficient privilege');

      const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "p82ceali",
        contraseña: "pass"
      });

      expect(logoutResponse.status).toBe(200);
      expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    }); 

    it('Eliminar un usuario específico (login con admin)', async () => {

      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
      
      const objectId = await obtenerIdPorNombreUsuario("p82ceali");
      const url = '/api/usuarios/' + objectId;
      const response = await agent.delete(url);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("El usuario ha sido eliminado");

      const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(logoutResponse.status).toBe(200);
      expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    }); 

    
    
    it('Eliminar un usuario inexistente (login con admin)', async () => {

      const loginResponse = await agent.post('/api/usuarios/auth/login').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');

      const objectId = new ObjectId("5f1d7f1a1e4b1a1b1c1d2f22");
      const url = '/api/usuarios/' + objectId;
      const response = await agent.delete(url);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Usuario no encontrado");

      const logoutResponse = await agent.post('/api/usuarios/auth/logout').send({
        nombre_usuario: "admin",
        contraseña: "admin"
      });

      expect(logoutResponse.status).toBe(200);
      expect(logoutResponse.body.message).toBe('Sesión cerrada exitosamente');
    }); 










    /*
    it('Cierre de sesión de un usuario existente (admin)', async () => {
      const UsuarioAct = {
        nombre_usuario: "admin",
        contraseña: "admin"
      }
      const response = await agent.post('/api/usuarios/auth/logout/').send(UsuarioAct);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Sesión cerrada exitosamente');
  
      });

      it('Cierre de sesión de un usuario inexistente', async () => {

        const UsuarioAct = {
          nombre_usuario: 'usuario',
          nombre: 'usuario',
          apellido: 'usuario',
          contraseña: 'contrasena',
          fecha_nacimiento: '2000-09-19',
          privilegio: 1,
          rol: 'cliente',
        };
        const response = await agent.post('/api/usuarios/auth/logout/').send(UsuarioAct);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    
      });  


    it('Inicio de sesión de un usuario existente (admin)', async () => {
      const UsuarioAct = {
        nombre_usuario: "admin",
        contraseña: "admin"
      }
    const response = await agent.post('/api/usuarios/auth/login/').send(UsuarioAct);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Inicio de sesión exitoso');

    });

    it('Inicio de sesión de un usuario existente con constraseña errónea (admin)', async () => {
      const UsuarioAct = {
        nombre_usuario: "admin",
        contraseña: "contraseña"
      }
    const response = await agent.post('/api/usuarios/auth/login/').send(UsuarioAct);
    expect(response.status).toBe(402);
    expect(response.body.message).toBe('Credenciales incorrectas');

    });

    //COMPROBAR EL FALLO DE ESTAS FUNCION
    it('Inicio de sesión de un usuario inexistente', async () => {

      const UsuarioAct = {
        nombre_usuario: 'usuario',
        nombre: 'usuario',
        apellido: 'usuario',
        contraseña: 'contrasena',
        fecha_nacimiento: '2000-09-19',
        privilegio: 1,
        rol: 'cliente',
      };
      
    const response = await agent.post('/api/usuarios/auth/login/').send(UsuarioAct);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Usuario incorrecto');

    }); */

    
    

})