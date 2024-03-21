const fs = require('fs');
const path = require('path');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const users = require('../models/users');
const generateUniqueId = require('../utils/generateUniqueId');

const directoryPath = path.join(__dirname, '../data/usertest');

beforeAll(() => {
  if (!fs.existsSync(directoryPath)) {
    console.log(`[Setup] Creando directorio para pruebas: ${directoryPath}`);
    fs.mkdirSync(directoryPath, { recursive: true });
  }
});

afterAll(async () => {
  console.log(`[Teardown] Eliminando directorio de pruebas: ${directoryPath}`);
  console.log('Contenido del directorio:', fs.readdirSync(directoryPath));
  await fs.promises.rm(directoryPath, { recursive: true, force: true });
});

jest.mock('jsonwebtoken', () => {
  const originalModule = jest.requireActual('jsonwebtoken');
  return {
    ...originalModule,
    sign: jest.fn((payload, secret, options) => {
      console.log('Generando token con payload:', payload);
      console.log('Usando el secreto:', secret);
      return originalModule.sign(payload, secret, options);
    }),
    verify: jest.fn((token, secret, callback) => {
      console.log('Verificando token:', token);
      console.log('Usando el secreto de verificación:', secret);
      const decodedToken = originalModule.verify(token, secret);
      const testUser = {
        id: decodedToken.id,
        createdAt: decodedToken.createdAt,
        updatedAt: decodedToken.updatedAt,
        username: decodedToken.username,
        role: decodedToken.role
      };

      if (callback && typeof callback === 'function') {
        callback(null, testUser);
      }

      return testUser;
    }),
  };
});

describe('Registro de usuarios', () => {
  it('debería registrar un usuario y devolver un token', async () => {
    const testUniqueId = generateUniqueId();

    jest.spyOn(users, 'register').mockImplementation(async (user) => {
      const createdUser = {
        id: testUniqueId,
        email: user.email,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        username: user.username,
        role: user.role
      };

      const filePath = path.join(directoryPath, `${testUniqueId}.json`);
      fs.writeFileSync(filePath, JSON.stringify(createdUser));

      return createdUser;
    });

    const response = await request(app)
      .post('/public/users/register')
      .send({
        email: 'testUser@example.com',
        password: 'testPassword',
        username: 'testUser',
        role: 'user',
      });

    expect(response.body).toHaveProperty('message', 'Registro Exitoso');
    expect(response.body).toHaveProperty('token');
    expect(response.body).not.toHaveProperty('password'); // Asegurar que la contraseña no está presente en la respuesta

    const decodedToken = jwt.verify(response.body.token, process.env.LOCAL_TOKEN_SECRET_TEST);

    expect(decodedToken).toHaveProperty('id', testUniqueId);

    const filePath = path.join(directoryPath, `${decodedToken.id}.json`);
    expect(fs.existsSync(filePath)).toBe(true);

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsedUser = JSON.parse(fileContent);

    console.log('Contenido del archivo JSON:', fileContent); // Aquí imprime el contenido del archivo

    expect(parsedUser).toEqual({
      id: testUniqueId,
      email: 'testUser@example.com',
      username: 'testUser',
      role: 'user',
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
    });
  });

  it('debería devolver un error si el registro falla', async () => {
    jest.spyOn(users, 'register').mockRejectedValue(new Error('Error en el registro'));

    const response = await request(app)
      .post('/public/users/register')
      .send({
        email: 'testUser@example.com',
        password: 'testPassword',
        username: 'testUser',
        role: 'user',
      });

    expect(response.status).toBe(400); // Actualizar el estado esperado a 400 Bad Request
    expect(response.body).toHaveProperty('error', 'Error en el registro');
  });
});
