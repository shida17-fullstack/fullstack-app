/**
 * Config: Passport.js
 */
console.log('Secret for test:', process.env.LOCAL_TOKEN_SECRET_TEST);
console.log('Secret for normal:', process.env.LOCAL_TOKEN_SECRET);


const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const StrategyJWT = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { users } = require('../models');

module.exports = async (passport) => {
  try {
    let secretKey;

    if (process.env.USE_SECRET_MANAGER === 'true') {
      // Acceder al secreto desde Secret Manager en GCP
      const client = new SecretManagerServiceClient();
      const [version] = await client.accessSecretVersion({
        name: `projects/jenkinsgpc/secrets/${process.env.GCP_TOKEN_SECRET}/versions/latest`,
      });

      secretKey = version.payload.data.toString();
      console.log('Usando el secreto de Google Cloud Secret Manager:', secretKey);
    } else {
      // Utilizar el secreto local del archivo .env
      if (process.env.NODE_ENV === 'test') {
        secretKey = process.env.LOCAL_TOKEN_SECRET_TEST;
        console.log('Usando el secreto de prueba del archivo .env:', secretKey);
      } else if (process.env.NODE_ENV === 'development') {
        secretKey = process.env.LOCAL_TOKEN_SECRET;
        console.log(`Usando el secreto ${process.env.NODE_ENV === 'test' ? 'de prueba' : 'local'} del archivo .env:`, secretKey);

      }
    }
    const options = {};
    options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
    options.secretOrKey = secretKey;

    passport.use(new StrategyJWT(options, async (jwtPayload, done) => {
      let user;
      try {
        user = await users.getById(jwtPayload.id);
      } catch (error) {
        console.log(error);
        return done(error, null);
      }

      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    }));
  } catch (error) {
    console.error('Error al acceder al secreto:', error);
    throw error; // Manejar el error 
  }
};
