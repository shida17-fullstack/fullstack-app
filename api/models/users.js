// MODELO
const { Storage } = require('@google-cloud/storage');
const uuid = require('uuid');
const fs = require('fs').promises;

const utils = require('../utils');

const storage = new Storage();
const bucketName = 'proyecto-jenkins-gcp';
const bucket = storage.bucket(bucketName);

const isLocalStorage = process.env.USE_LOCAL_STORAGE === 'true';

const register = async (user = {}) => {
  console.log('Usuario recibido:', user);

// Validación
if (!user.email || !user.password || !user.username || !user.role) {
  throw new Error('"email", "password", "username", y "role" son obligatorios');
}

  // Validación
  if (!user.email || !user.password || !user.username || !user.role) {
    
    throw new Error('"email", "password", "username", y "role" son obligatorios');
  }

  if (!utils.validateEmailAddress(user.email)) {
    throw new Error(`"${user.email}" no es una dirección de correo electrónico válida`);
  }

  // Genera un nuevo id único usando uuid
  const generatedId = uuid.v4();

  // Verifica si el usuario ya está registrado
  const existingUser = await getByEmail(user.email);
  if (existingUser) {
    throw new Error(`Ya existe un usuario con el correo electrónico "${user.email}"`);
  }

  user.password = utils.hashPassword(user.password);

  if (isLocalStorage) {
    // Guarda el usuario localmente usando fs
    let filename;
    if (process.env.NODE_ENV === 'test') {
        filename = `data/usertest/${generatedId}.json`;
    } else {
        filename = `data/users/${generatedId}.json`;
    }
  await fs.writeFile(filename, JSON.stringify({
      id: generatedId,  // Agrega el ID al objeto del usuario
      email: user.email,
      password: user.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      username: user.username,
      role: user.role,
    }));

    //obtenemos el usuario por su ID
    const registeredUser = await getById(generatedId);
    return registeredUser;
  } else {
    // Guarda el usuario en Cloud Storage
    const filename = `data/users/${generatedId}.json`;  // Utiliza el ID como parte del nombre del archivo
    const file = bucket.file(filename);

    await file.save(JSON.stringify({
      id: generatedId,  // Agrega el ID al objeto del usuario
      email: user.email,
      password: user.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      username: user.username,
      role: user.role,
    }));

    //  obtenemos el usuario por su ID
    const registeredUser = await getById(generatedId);
    return registeredUser;
  }
};

const getByEmail = async (email) => {
  // Validación
  if (!email) {
    throw new Error('"email" es obligatorio');
  }

  if (!utils.validateEmailAddress(email)) {
    throw new Error(`"${email}" no es una dirección de correo electrónico válida`);
  }

  if (isLocalStorage) {
    //Se busca en los archivos de usuario que están en el directorio "data/users".
    const files = await fs.readdir('data/users');

    for (const file of files) {
      const content = await fs.readFile(`data/users/${file}`);
      const user = JSON.parse(content.toString());

      if (user.email === email) {
        return user;
      }
    }

    // Si no se encuentra el usuario, devuelve null
    return null;
  } else {
    
    const filename = `data/users/${email}.json`;
    const file = bucket.file(filename);

    try {
      const [content] = await file.download();
      const user = JSON.parse(content.toString());
      return user;
    } catch (error) {
      // Si el archivo no existe, devuelve null
      return null;
    }
  }
};

const getById = async (id) => {
  // Validación
  if (!id) {
    throw new Error('"id" es obligatorio');
  }

  if (isLocalStorage) {
    // Consulta el almacenamiento local para el archivo de usuario
    const filename = isLocalStorage ? `data/users/${id}.json` : `data/users/${id}`;

    try {
      const content = await fs.readFile(filename);
      const user = JSON.parse(content.toString());
      return user;
    } catch (error) {
      // Si el archivo no existe, devuelve null
      return null;
    }
  } else {
    // Consulta Cloud Storage para el archivo de usuario
    const filename = isLocalStorage ? `data/users/${id}.json` : `data/users/${id}`;
    const file = bucket.file(filename);

    try {
      const [content] = await file.download();
      const user = JSON.parse(content.toString());
      return user;
    } catch (error) {
      // Si el archivo no existe, devuelve null
      return null;
    }
  }
};

const convertToPublicFormat = (user = {}) => {
  user.email = user.email || null;
  user.id = user.id || null;
  if (user.email) delete user.email;
  if (user.password) delete user.password;
  return user;
};

module.exports = {
  register,
  getByEmail,
  getById,
  convertToPublicFormat,
};
