const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Ruta base para las solicitudes al backend
    createProxyMiddleware({
      target: 'http://localhost:3000', // URL del servidor backend
      changeOrigin: true,
    })
  );
};
