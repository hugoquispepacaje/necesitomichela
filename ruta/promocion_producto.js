const express = require('express');
const router = express.Router();
const { buscarPorPromocionController, mostrarProductosEnPromocionController} = require('../controlador/promocion_producto.js');
const {buscarPromocionProductoController, crearPromocionProductoController} = require('../controlador/promocion_producto.js');
const {actualizarPromocionProductoController, eliminarPromocionProductoController} = require('../controlador/promocion_producto.js');
const {validarToken} = require('../funciones/jwt.js');

router.get('/buscar_por_promocion/:id_promocion', validarToken, buscarPorPromocionController);

router.get('/buscar_promocion_producto/:id_promocion_producto', validarToken, buscarPromocionProductoController);

router.post('/crear', validarToken, crearPromocionProductoController);

router.put('/actualizar/:id_promocion_producto', validarToken, actualizarPromocionProductoController);

router.delete('/eliminar/:id_promocion_producto', validarToken, eliminarPromocionProductoController);

router.get('/buscar_productos_en_promocion/:id_promocion', mostrarProductosEnPromocionController);


module.exports = router;