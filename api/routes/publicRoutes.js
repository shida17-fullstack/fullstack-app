const express = require('express');
const router = express.Router();
const { users } = require('../controllers');

// Rutas Públicas
router.post('/users/register', (req, res, next) => {
  users.register(req, res, next).catch(next);
});

router.post('/users/login', (req, res, next) => {
  users.login(req, res, next).catch(next);
});



module.exports = router;
