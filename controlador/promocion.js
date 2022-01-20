const { crearPromocion, buscarPromocion } = require('../funciones/pg/promocion.js');
const { buscarPromocionesPorBotilleria, mostrarPromociones } = require('../funciones/pg/promocion.js');
const { actualizarPromocion, eliminarPromocion } = require('../funciones/pg/promocion.js');
const { buscarBotilleria } = require('../funciones/pg/botilleria.js');
const { estaVacio, esNull } = require('../funciones/general.js');
const { validacionCrear, validacionActualizar } = require('../funciones/validator/promocion.js');
const { validacionIdentificador } = require('../funciones/validator/general.js');

const mostrarPromocionesController = async (req, res) => {

    let respuesta_mostrar_promociones = await mostrarPromociones();
    if (!estaVacio(respuesta_mostrar_promociones)) {
        res.status(200).json({ promociones: respuesta_mostrar_promociones });
    }
    else {
        res.status(500).json('No se encontraron promociones');
    }
}
const buscarPromocionesPorBotilleriaController = async (req, res) => {
    let id_botilleria = req.params.id_botilleria
    let validacion = validacionIdentificador({ dato: id_botilleria });
    if (validacion.passes()) {
        let respuesta_buscar_promociones = await buscarPromocionesPorBotilleria(id_botilleria);
        if (!estaVacio(respuesta_buscar_promociones)) {
            res.status(200).json({ promociones: respuesta_buscar_promociones });
        }
        else {
            res.status(500).json({ error: 'No se encontraron promociones' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}
const buscarPromocionController = async (req, res) => {
    let id_promocion = req.params.id_promocion
    let validacion = validacionIdentificador({ dato: id_promocion });
    if (validacion.passes()) {
        let respuesta_buscar_promocion = await buscarPromocion(id_promocion);
        if (!estaVacio(respuesta_buscar_promocion)) {
            res.status(200).json({ promocion: respuesta_buscar_promocion });
        }
        else {
            res.status(500).json({ error: 'No se encontro promocion' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}
const crearPromocionController = async (req, res) => {

    let validacion = validacionCrear(req.body);
    if (validacion.passes()) {
        let respuesta_buscar_botilleria = await buscarBotilleria(req.body.id_botilleria);
        if (!estaVacio(respuesta_buscar_botilleria)) {
            let respuesta_crear_promocion = await crearPromocion(req.body);
            if (!esNull(respuesta_crear_promocion[0].id)) {
                res.status(200).json({ registro: true, respuesta: respuesta_crear_promocion });
            }
            else {
                res.status(500).json(respuesta_crear_promocion);
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
const actualizarPromocionController = async (req, res) => {
    let peticion = req.body
    peticion.id_promocion = req.params.id_promocion
    let validacion = validacionActualizar(peticion);
    if (validacion.passes()) {
        let respuesta_buscar_promocion = await buscarPromocion(req.params.id_promocion);
        if (!estaVacio(respuesta_buscar_promocion)) {
            let respuesta_actualizar_promocion = await actualizarPromocion(req.body, req.params.id_promocion);
            if (!esNull(respuesta_actualizar_promocion[0].id)) {
                res.status(200).json({ actualizacion: true, respuesta: respuesta_actualizar_promocion });
            }
            else {
                res.status(500).json(respuesta_actualizar_promocion);
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
const eliminarPromocionController = async (req, res) => {
    let id_promocion = req.params.id_promocion
    let validacion = validacionIdentificador({ dato: id_promocion });
    if (validacion.passes()) {
        let respuesta_buscar_promocion = await buscarPromocion(id_promocion);
        if (!estaVacio(respuesta_buscar_promocion)) {
            await eliminarPromocion(id_promocion);
            res.status(200).json({ eliminar: true });
        }
        else {
            res.status(500).json({ error: 'No se encontro promocion' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}

module.exports = {
    mostrarPromocionesController,
    buscarPromocionesPorBotilleriaController,
    buscarPromocionController,
    crearPromocionController,
    actualizarPromocionController,
    eliminarPromocionController
}