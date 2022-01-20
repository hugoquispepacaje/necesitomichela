const { buscarPromocionProducto, crearPromocionProducto } = require('../funciones/pg/promocion_producto.js');
const { buscarProductosEnPromocion, actualizarPromocionProducto } = require('../funciones/pg/promocion_producto.js');
const { eliminarPromocionProducto, mostrarProductosEnPromocion } = require('../funciones/pg/promocion_producto.js');
const { buscarPromocion } = require('../funciones/pg/promocion.js');
const { buscarProducto } = require('../funciones/pg/producto.js');
const { estaVacio, esNull } = require('../funciones/general.js');
const { validacionCrear, validacionActualizar } = require('../funciones/validator/promocion_producto.js');
const { validacionIdentificador } = require('../funciones/validator/general.js');

const buscarPorPromocionController = async (req, res) => {
    let id_promocion = req.params.id_promocion
    let validacion = validacionIdentificador({ dato: id_promocion });
    if (validacion.passes()) {
        let respuesta_buscar_productos_en_promocion = await buscarProductosEnPromocion(id_promocion);
        if (!estaVacio(respuesta_buscar_productos_en_promocion)) {
            res.status(200).json({ productos_en_promocion: respuesta_buscar_productos_en_promocion });
        }
        else {
            res.status(500).json({ error: 'No se encontraron productos en promocion' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}
const buscarPromocionProductoController = async (req, res) => {
    let id_promocion_producto = req.params.id_promocion_producto
    let validacion = validacionIdentificador({ dato: id_promocion_producto });
    if (validacion.passes()) {
        let respuesta_buscar_promocion_producto= await buscarPromocionProducto(id_promocion_producto);
        if (!estaVacio(respuesta_buscar_promocion_producto)) {
            res.status(200).json({ promocion_producto: respuesta_buscar_promocion_producto });
        }
        else {
            res.status(500).json({ error: 'No se encontraron productos_promocion' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}
const crearPromocionProductoController = async (req, res) => {

    let validacion = validacionCrear(req.body);
    if (validacion.passes()) {
        let respuesta_buscar_promocion = await buscarPromocion(req.body.id_promocion);
        if (!estaVacio(respuesta_buscar_promocion)) {
            let respuesta_buscar_producto = await buscarProducto(req.body.id_producto);
            if (!estaVacio(respuesta_buscar_producto)) {
                let respuesta_crear_promocion_producto = await crearPromocionProducto(req.body);
                if (!esNull(respuesta_crear_promocion_producto[0].id)) {
                    res.status(200).json({ registro: true, respuesta: respuesta_crear_promocion_producto });
                }
                else {
                    res.status(500).json(respuesta_crear_promocion_producto);
                }
            }
            else {
                res.status(500).json({ error: 'No se encontro producto' });
            }
        }
        else {
            res.status(500).json({ error: 'No se encontro promocion' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}
const actualizarPromocionProductoController = async (req, res) => {
    let peticion = req.body
    peticion.id_promocion_producto = req.params.id_promocion_producto
    let validacion = validacionActualizar(peticion);
    if (validacion.passes()) {
        let respuesta_buscar_promocion_producto = await buscarPromocionProducto(req.params.id_promocion_producto);
        if (!estaVacio(respuesta_buscar_promocion_producto)) {
            let respuesta_actualizar_promocion_producto = await actualizarPromocionProducto(req.body, req.params.id_promocion_producto);
            if (!esNull(respuesta_actualizar_promocion_producto[0].id)) {
                res.status(200).json({ actualizacion: true, respuesta: respuesta_actualizar_promocion_producto });
            }
            else {
                res.status(500).json(respuesta_actualizar_promocion_producto);
            }
        }
        else {
            res.status(500).json({ error: 'No se encontro promocion_producto' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}
const eliminarPromocionProductoController = async (req, res) => {
    let id_promocion_producto = req.params.id_promocion_producto
    let validacion = validacionIdentificador({ dato: id_promocion_producto });
    if (validacion.passes()) {
        let respuesta_buscar_promocion_producto = await buscarPromocionProducto(id_promocion_producto);
        if (!estaVacio(respuesta_buscar_promocion_producto)) {
            await eliminarPromocionProducto(id_promocion_producto);
            res.status(200).json({ eliminar: true });
        }
        else {
            res.status(500).json({ error: 'No se encontro promocion_producto' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}

const mostrarProductosEnPromocionController = async (req, res) => {
    let id_promocion = req.params.id_promocion;
    let validacion = validacionIdentificador({ dato: id_promocion });
    if(validacion.passes()){
        let respuesta_produtos_en_promocion = await mostrarProductosEnPromocion(id_promocion);
        if (!estaVacio(respuesta_produtos_en_promocion)) {
            res.status(200).json({ respuesta: true, productos: respuesta_produtos_en_promocion});
        }
        else {
            res.status(500).json({ error: 'No se encontraron productos en promocion' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}

module.exports = {
    buscarPorPromocionController,
    buscarPromocionProductoController,
    crearPromocionProductoController,
    actualizarPromocionProductoController,
    eliminarPromocionProductoController,
    mostrarProductosEnPromocionController
}