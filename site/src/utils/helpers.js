import Cookies from 'js-cookie';

/**
 * Formatear Org y Username correctamente para el backend de Serverless Platform
 */
export const formatOrgAndUsername = (name = '') => {
   name = name.toString().toLowerCase().replace(/[^a-z\d-]+/gi, '-');
   // Eliminar múltiples instancias de guiones
   name = name.replace(/-{2,}/g, '-');
   if (name.length > 40) {
     name = name.substring(0, 40);
   }
   return name;
};

/**
 * Analizar parámetros de consulta en una URL
 * @param {*} searchString 
 */
export const parseQueryParams = (searchString = null) => {
  if (!searchString) {
    return null;
  }

  // Clonar cadena
  let clonedParams = (' ' + searchString).slice(1);

  return clonedParams
    .substr(1)
    .split('&')
    .filter((el) => el.length)
    .map((el) => el.split('='))
    .reduce(
      (accumulator, currentValue) =>
        Object.assign(accumulator, {
          [decodeURIComponent(currentValue.shift())]: decodeURIComponent(currentValue.pop())
        }),
      {}
    );
};

/**
 * Analizar fragmentos de hash en una URL
 */
export const parseHashFragment = (hashString) => {
  const hashData = {};
  let hash = decodeURI(hashString);
  hash = hash.split('&');
  hash.forEach((val) => {
    val = val.replace('#', '');
    hashData[val.split('=')[0]] = val.split('=')[1];
  });
  return hashData;
};

/**
 * Guardar sesión en cookie del navegador
 */
export const saveSession = (userId, userEmail, userToken) => {
  Cookies.set('serverless', { userId, userEmail, userToken });
  console.log('Sesión guardada:', { userId, userEmail, userToken });
};

/**
 * Obtener sesión en cookie del navegador
 */
export const getSession = () => {
  const data = Cookies.get('serverless');
  const session = data ? JSON.parse(data) : null;
  console.log('Sesión recuperada:', session);
  return session;
};


/**
 * Eliminar sesión en cookie del navegador
 */
export const deleteSession = () => {
  Cookies.remove('serverless');
  console.log('Sesión eliminada');
};
