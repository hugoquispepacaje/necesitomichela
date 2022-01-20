const express = require('express');
const router = express.Router();
const {login, registro, test, verificarCorreo} = require('../controlador/usuario.js');
const {validarToken} = require('../funciones/jwt.js');

router.get('/', validarToken,test);

router.get('/verificacion_correo/:codigo', verificarCorreo);

router.post('/login', login);

router.post('/registro', registro);

module.exports = router;