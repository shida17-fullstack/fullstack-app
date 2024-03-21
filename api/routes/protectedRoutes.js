const express = require('express');
const router = express.Router();
const { users } = require('../controllers');
const passport = require('passport');

// Rutas Protegidas
router.post('/user', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  users.get(req, res, next).catch(next);
});

module.exports = router;
