// routes/catchAllRoute.js
const express = require('express');
const router = express.Router();

// Ruta de Captura-All
router.get('*', (req, res) => {
  res.status(404).send('Error 404: Ruta no encontrada');
});

module.exports = router;
