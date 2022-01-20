const express = require('express');
const router = express.Router();
const {mostrarPromocionesController, buscarPromocionesPorBotilleriaController} = require('../controlador/promocion.js');
const {buscarPromocionController, crearPromocionController} = require('../controlador/promocion.js');
const {actualizarPromocionController, eliminarPromocionController} = require('../controlador/promocion.js');
const {validarToken} = require('../funciones/jwt.js');

router.get('/mostrar', mostrarPromocionesController);

router.get('/buscar_por_botilleria/:id_botilleria', validarToken, buscarPromocionesPorBotilleriaController);

router.get('/buscar_promocion/:id_promocion', validarToken, buscarPromocionController);

router.post('/crear', validarToken, crearPromocionController);

router.put('/actualizar/:id_promocion', validarToken, actualizarPromocionController);

router.delete('/eliminar/:id_promocion', validarToken, eliminarPromocionController);

module.exports = router;