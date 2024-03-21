require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const passport = require('passport');

// Configuraciones y middleware

const app = express();  // Inicializar express 

// Configurar middleware para analizar el cuerpo JSON
app.use(express.json());

// Configura cors para permitir solicitudes desde http://localhost:3002
app.use(cors({ origin: 'http://localhost:3002' }));

// Rutas Publicas y Protegidas
const publicRoutes = require('./routes/publicRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

// Ruta de Captura-All
const catchAllRoute = require('./routes/catchAllRoute');


// Configure Passport
require('./config/passport')(passport);

// Configuraciones adicionales y otros middleware

// Uso de rutas
app.use('/public', publicRoutes);
app.use('/protected', passport.authenticate('jwt', { session: false }), protectedRoutes);
app.use(catchAllRoute);


// Exportar la aplicación
module.exports = app;
