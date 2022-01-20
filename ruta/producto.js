const express = require('express');
const router = express.Router();
const {mostrarProductosController, buscarProductosPorBotilleriaController} = require('../controlador/producto.js');
const {buscarProductoController, crearProductoController} = require('../controlador/producto.js');
const {actualizarProductoController, eliminarProductoController} = require('../controlador/producto.js');
const {validarToken} = require('../funciones/jwt.js');

router.get('/mostrar', mostrarProductosController);

router.get('/buscar_por_botilleria/:id_botilleria', validarToken, buscarProductosPorBotilleriaController);

router.get('/buscar_producto/:id_producto', validarToken, buscarProductoController);

router.post('/crear', validarToken, crearProductoController);

router.put('/actualizar/:id_producto', validarToken, actualizarProductoController);

router.delete('/eliminar/:id_producto', validarToken, eliminarProductoController);

module.exports = router;