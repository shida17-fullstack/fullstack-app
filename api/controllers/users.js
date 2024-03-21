const jwt = require('jsonwebtoken');
const { comparePassword } = require('../utils');
const users = require('../models/users');
const generateUniqueId = require('../utils/generateUniqueId.js');
const { SecretManagerServiceClient } = require('../config/passport'); // Importa la función para obtener el secreto desde Secret Manager

/**
 * Save
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 */
const register = async (req, res, next) => {
  try {
    // Intenta registrar al usuario
    const user = await users.register(req.body);

    // Asegurarse de tener un ID válido
    const userId = user.id || generateUniqueId();

    // Payload del token para registro
    const registerTokenPayload = {
      id: userId,
      email: user.email,
      username: user.username, // Propiedad adicional
      role: user.role, // Propiedad adicional
      createdAt: user.createdAt, // Propiedad adicional
    };

    // Token de registro
    let secretKey;
    if (process.env.USE_SECRET_MANAGER === 'true') {
      // En producción, utiliza el secreto de Secret Manager
      const client = new SecretManagerServiceClient();
      const [version] = await client.accessSecretVersion({
        name: `projects/jenkinsgpc/secrets/${process.env.GCP_TOKEN_SECRET}/versions/latest`,
      });
    
      secretKey = version.payload.data.toString();
      console.log('Usando el secreto de Google Cloud Secret Manager:', secretKey);
    } else if (process.env.NODE_ENV === 'test') {
      // En modo de prueba, utiliza el secreto de prueba del archivo .env
      secretKey = process.env.LOCAL_TOKEN_SECRET_TEST;
      console.log('Usando el secreto de prueba del archivo .env:', secretKey);
    } else if (process.env.NODE_ENV === 'development') {
      // En desarrollo, utiliza el secreto local del archivo .env
      secretKey = process.env.LOCAL_TOKEN_SECRET;
      console.log('Usando el secreto local del archivo .env:', secretKey);
    }

    const registerToken = jwt.sign(registerTokenPayload, secretKey, { expiresIn: '1d' });
    res.json({ message: 'Registro Exitoso', token: registerToken });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Sign a user in
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const login = async (req, res, next) => {
  try {
    console.log('Intentando obtener usuario por email:', req.body.email);
    const user = await users.getByEmail(req.body.email);
    console.log('Usuario obtenido:', user);

    if (!user) {
      return res.status(404).json({ error: 'Autenticacion fallo. Usuario no encontrado.' });
    }

    const isCorrect = comparePassword(req.body.password, user.password);
    if (!isCorrect) {
      console.log('Contraseña incorrecta.');
      return res.status(401).json({ error: 'Autenticacion fallo. Password Incorrecta.' });
    }

    // Asegurarse de tener un ID válido
    const userId = user.id || generateUniqueId();

    // Payload del token de inicio de sesión
    const loginTokenPayload = {
      id: userId,
      email: user.email,
      username: user.username, // Propiedad adicional
      role: user.role, // Propiedad adicional 
      createdAt: user.createdAt, // Propiedad adicional
    };

    // Token de inicio de sesión
    let secretKey;
    if (process.env.USE_SECRET_MANAGER === 'true') {
      // En producción, utiliza el secreto de Secret Manager
      const client = new SecretManagerServiceClient();
      const [version] = await client.accessSecretVersion({
        name: `projects/jenkinsgpc/secrets/${process.env.GCP_TOKEN_SECRET}/versions/latest`,
      });
    
      secretKey = version.payload.data.toString();
      console.log('Usando el secreto de Google Cloud Secret Manager:', secretKey);
    } else if (process.env.NODE_ENV === 'test') {
      // En modo de prueba, utiliza el secreto de prueba del archivo .env
      secretKey = process.env.LOCAL_TOKEN_SECRET_TEST;
      console.log('Usando el secreto de prueba del archivo .env:', secretKey);
    } else if (process.env.NODE_ENV === 'development') {
      // En desarrollo, utiliza el secreto local del archivo .env
      secretKey = process.env.LOCAL_TOKEN_SECRET;
      console.log('Usando el secreto local del archivo .env:', secretKey);
    }

    const loginToken = jwt.sign(loginTokenPayload, secretKey, { expiresIn: '1d' });

    // Verificar el token antes de responder al cliente
    const decodedToken = jwt.verify(loginToken, secretKey);
    console.log('Token verificado:', decodedToken);

    res.status(200).json({ message: 'Autenticacion Exitosa', token: loginToken });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


/**
 * Get a user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const get = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let user;

    if (process.env.NODE_ENV === 'test') {
      // Si estamos en modo de prueba, utiliza el usuario ficticio
      user = testUser; // Utiliza el usuario de prueba que se creó en la prueba
    } else {
      // En otro caso, accede a la base de datos real o data/users para obtener el usuario
      user = await users.getById(userId);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
    }

    const publicUser = users.convertToPublicFormat(user);
    res.json({ user: publicUser });
  } catch (error) {
    next(error); // Pasar el error al siguiente middleware o controlador de errores
  }
};

module.exports = {
  register,
  login,
  get,
};
