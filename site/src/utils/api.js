import config from '../config/config';

/**
 * Registra un nuevo usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @param {string} username - Nombre de usuario del usuario.
 * @param {string} role - Rol del usuario.
 * @returns {Promise} - Promesa que se resuelve con la respuesta de la API.
 */
export const userRegister = async (email, password, username, role) => {
  console.log(`Calling requestApi from userRegister with method: ${config.method}`);
  return await requestApi('register', config.method, { email, password, username, role });
};

/**
 * Inicia sesión de un usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise} - Promesa que se resuelve con la respuesta de la API.
 */
export const userLogin = async (email, password) => {
  console.log(`Calling requestApi from userLogin with method: ${config.method}`);
  return await requestApi('login', config.method, { email, password });
};

/**
 * Obtiene los datos del usuario.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise} - Promesa que se resuelve con la respuesta de la API.
 */
export const userGet = async (token) => {
  console.log(`Calling requestApi from userGet with method: ${config.method}`);
  return await requestApi('userGet', config.method, null, {
    Authorization: `Bearer ${token}`
  });
};

/**
 * Petición API para llamar al backend.
 * @param {string} route - Ruta de la API.
 * @param {string} method - Método HTTP de la petición.
 * @param {Object|null} data - Datos a enviar en la petición (por defecto es null).
 * @param {Object} headers - Cabeceras de la petición (por defecto es un objeto vacío).
 * @returns {Promise} - Promesa que se resuelve con los datos obtenidos de la API.
 */
export const requestApi = async (
  route = '',
  method = config.method,
  data = null,
  headers = {}
) => {
  // Verificar si se ha configurado la URL de la API
  if (!config?.domains?.api) {
    throw new Error(`Error: Falta el dominio de la API. Por favor, agrega el dominio de la API de tu backend Express.js sin servidor a esta aplicación front-end.`);
  }

  // Obtener la ruta desde la configuración de rutas
  const path = config.routes[route];

  // Lanzar un error si la ruta no se encuentra
  if (!path) {
    throw new Error(`Error: Ruta '${route}' no encontrada en la configuración.`);
  }

  // Preparar la URL
  const url = `${config.domains.api}${path}`;

  // Establecer las cabeceras
  headers = Object.assign(
    { 'Content-Type': 'application/json' },
    headers
  );

  // Las opciones por defecto están marcadas con *
  const response = await fetch(url, {
    method: method.toUpperCase(),
    mode: 'cors',
    cache: 'no-cache',
    headers,
    body: data ? JSON.stringify(data) : null
  });

  // Lanzar un error si la respuesta no es satisfactoria
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Fallo al obtener datos del servidor.');
  }

  return await response.json();
};
