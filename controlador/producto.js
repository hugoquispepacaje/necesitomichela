const { crearProducto, buscarProducto } = require('../funciones/pg/producto.js');
const { buscarProductosPorBotilleria, mostrarProductos } = require('../funciones/pg/producto.js');
const { actualizarProducto, eliminarProducto } = require('../funciones/pg/producto.js');
const { buscarBotilleria } = require('../funciones/pg/botilleria.js');
const { estaVacio, esNull } = require('../funciones/general.js');
const { validacionCrear, validacionActualizar } = require('../funciones/validator/producto.js');
const { validacionIdentificador } = require('../funciones/validator/general.js');

const mostrarProductosController = async (req, res) => {

    let respuesta_mostrar_productos = await mostrarProductos();
    if (!estaVacio(respuesta_mostrar_productos)) {
        res.status(200).json({ productos: respuesta_mostrar_productos });
    }
    else {
        res.status(500).json('No se encontraron productos');
    }
}
const buscarProductosPorBotilleriaController = async (req, res) => {
    let id_botilleria = req.params.id_botilleria
    let validacion = validacionIdentificador({ dato: id_botilleria });
    if (validacion.passes()) {
        let respuesta_buscar_productos = await buscarProductosPorBotilleria(id_botilleria);
        if (!estaVacio(respuesta_buscar_productos)) {
            res.status(200).json({ productos: respuesta_buscar_productos });
        }
        else {
            res.status(500).json({ error: 'No se encontraron productos' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}
const buscarProductoController = async (req, res) => {
    let id_producto = req.params.id_producto
    let validacion = validacionIdentificador({ dato: id_producto });
    if (validacion.passes()) {
        let respuesta_buscar_producto = await buscarProducto(id_producto);
        if (!estaVacio(respuesta_buscar_producto)) {
            res.status(200).json({ producto: respuesta_buscar_producto });
        }
        else {
            res.status(500).json({ error: 'No se encontro producto' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}
const crearProductoController = async (req, res) => {

    let validacion = validacionCrear(req.body);
    if (validacion.passes()) {
        let respuesta_buscar_botilleria = await buscarBotilleria(req.body.id_botilleria);
        if (!estaVacio(respuesta_buscar_botilleria)) {
            let respuesta_crear_producto = await crearProducto(req.body);
            if (!esNull(respuesta_crear_producto[0].id)) {
                res.status(200).json({ registro: true, respuesta: respuesta_crear_producto });
            }
            else {
                res.status(500).json(respuesta_crear_producto);
            }
        }
        else {
            res.status(500).json({ error: 'No se encontro botilleria' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }

}
const actualizarProductoController = async (req, res) => {
    let peticion = req.body
    peticion.id_producto = req.params.id_producto
    let validacion = validacionActualizar(peticion);
    if (validacion.passes()) {
        let respuesta_buscar_producto = await buscarProducto(req.params.id_producto);
        if (!estaVacio(respuesta_buscar_producto)) {
            let respuesta_actualizar_producto = await actualizarProducto(req.body, req.params.id_producto);
            if (!esNull(respuesta_actualizar_producto[0].id)) {
                res.status(200).json({ actualizacion: true, respuesta: respuesta_actualizar_producto });
            }
            else {
                res.status(500).json(respuesta_actualizar_producto);
            }
        }
        else {
            res.status(500).json({ error: 'No se encontro producto' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}
const eliminarProductoController = async (req, res) => {
    let id_producto = req.params.id_producto
    let validacion = validacionIdentificador({ dato: id_producto });
    if (validacion.passes()) {
        let respuesta_buscar_producto = await buscarProducto(id_producto);
        if (!estaVacio(respuesta_buscar_producto)) {
            await eliminarProducto(id_producto);
            res.status(200).json({ eliminar: true });
        }
        else {
            res.status(500).json({ error: 'No se encontro producto' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}

module.exports = {
    mostrarProductosController,
    buscarProductosPorBotilleriaController,
    buscarProductoController,
    crearProductoController,
    actualizarProductoController,
    eliminarProductoController
}