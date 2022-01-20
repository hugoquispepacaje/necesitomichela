const express = require('express');
const router = express.Router();
const {mostrarBotilleriasController, buscarBotilleriasPorDuenoController} = require('../controlador/botilleria.js');
const {buscarBotilleriaController, crearBotilleriaController} = require('../controlador/botilleria.js');
const {actualizarBotilleriaController, eliminarBotilleriaController} = require('../controlador/botilleria.js');
const {validarPertenenciaADueno, validarPertenencia} = require('../controlador/botilleria.js');
const {validarToken} = require('../funciones/jwt.js');

router.get('/mostrar', mostrarBotilleriasController);

router.get('/buscar_por_dueno/:id_usuario', validarToken, validarPertenencia, buscarBotilleriasPorDuenoController);

router.get('/buscar_botilleria/:id_botilleria', buscarBotilleriaController);

router.post('/crear', validarToken, crearBotilleriaController);

router.put('/actualizar/:id_botilleria', validarToken, validarPertenenciaADueno, actualizarBotilleriaController);

router.delete('/eliminar/:id_botilleria', validarToken, validarPertenenciaADueno, eliminarBotilleriaController);

module.exports = router;