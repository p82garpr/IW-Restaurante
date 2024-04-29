import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user');
        setUser(response.data.user);
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:4000/api/usuarios/auth/login', credentials);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Error al iniciar sesión');
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const signup = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:4000/api/signup', credentials);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      console.error('Error al registrarse:', error);
      throw new Error('Error al registrarse');
    }
  };

  const anadirProductoCesta = (id, nombre_prod, precio) => {
    const userJson = localStorage.getItem('user');
    const storedUser = userJson ? JSON.parse(userJson) : null;
    let indice = storedUser.cesta.findIndex(item => item._id === id);
    if (indice === -1) {
      storedUser.cesta.push({ id: id, nombre_prod: nombre_prod, precio: precio });
    } else {
      storedUser.cesta[indice].cantidad += 1;
    }
    setUser(storedUser);
  };
  
  const value = useMemo(() => {
    return {
      user,
      login,
      logout,
      signup,
      anadirProductoCesta
    };
  }, [user]);
  
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export function useUsuario() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUsuario debe estar dentro del proveedor AuthContext');
  }
  return context;
}