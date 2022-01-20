const { crearBotilleria, buscarBotilleria } = require('../funciones/pg/botilleria.js');
const { buscarBotilleriasPorDueno, mostrarBotillerias } = require('../funciones/pg/botilleria.js');
const { actualizarBotilleria, eliminarBotilleria } = require('../funciones/pg/botilleria.js');
const { perteneceADueno } = require('../funciones/pg/botilleria.js');
const { estaVacio, esNull } = require('../funciones/general.js');
const { validacionCrear, validacionActualizar } = require('../funciones/validator/botilleria.js');
const { validacionIdentificador } = require('../funciones/validator/general.js');

const mostrarBotilleriasController = async (req, res) => {

    let respuesta_mostrar_botillerias = await mostrarBotillerias();
    if (!estaVacio(respuesta_mostrar_botillerias)) {
        res.status(200).json({ botillerias: respuesta_mostrar_botillerias });
    }
    else {
        res.status(500).json('No se encontraron botillerias');
    }
}
const buscarBotilleriasPorDuenoController = async (req, res) => {
    let id_usuario = req.params.id_usuario
    let validacion = validacionIdentificador({ dato: id_usuario });
    if (validacion.passes()) {
        let respuesta_buscar_botillerias = await buscarBotilleriasPorDueno(id_usuario);
        if (!estaVacio(respuesta_buscar_botillerias)) {
            res.status(200).json({ botillerias: respuesta_buscar_botillerias });
        }
        else {
            res.status(500).json('No se encontraron botillerias');
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}
const buscarBotilleriaController = async (req, res) => {
    let id_botilleria = req.params.id_botilleria
    let validacion = validacionIdentificador({ dato: id_botilleria });
    if (validacion.passes()) {
        let respuesta_buscar_botilleria = await buscarBotilleria(id_botilleria);
        if (!estaVacio(respuesta_buscar_botilleria)) {
            res.status(200).json({ botilleria: respuesta_buscar_botilleria });
        }
        else {
            res.status(500).json({ error: 'No se encontro botilleria' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}
const crearBotilleriaController = async (req, res) => {

    let validacion = validacionCrear(req.body);
    if (validacion.passes()) {
        let respuesta_crear_botilleria = await crearBotilleria(req.body);
        if (!esNull(respuesta_crear_botilleria[0].id)) {
            res.status(200).json({ registro: true, respuesta: respuesta_crear_botilleria });
        }
        else {
            res.status(500).json(respuesta_crear_botilleria);
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }

}
const actualizarBotilleriaController = async (req, res) => {
    let peticion = req.body
    peticion.id_botilleria = req.params.id_botilleria
    let validacion = validacionActualizar(peticion);
    if (validacion.passes()) {
        let respuesta_buscar_botilleria = await buscarBotilleria(req.params.id_botilleria);
        if (!estaVacio(respuesta_buscar_botilleria)) {
            let respuesta_actualizar_botilleria = await actualizarBotilleria(req.body, req.params.id_botilleria);
            if (!esNull(respuesta_actualizar_botilleria[0].id)) {
                res.status(200).json({ actualizacion: true, respuesta: respuesta_actualizar_botilleria });
            }
            else {
                res.status(500).json(respuesta_actualizar_botilleria);
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
const eliminarBotilleriaController = async (req, res) => {
    let id_botilleria = req.params.id_botilleria
    let validacion = validacionIdentificador({ dato: id_botilleria });
    if (validacion.passes()) {
        let respuesta_buscar_botilleria = await buscarBotilleria(id_botilleria);
        if (!estaVacio(respuesta_buscar_botilleria)) {
            await eliminarBotilleria(id_botilleria);
            res.status(200).json({ eliminar: true });
        }
        else {
            res.status(500).json({ error: 'No se encontro botilleria' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}

const validarPertenenciaADueno = async (req, res, next) => {
    try{
        let respuesta = await perteneceADueno(req.params.id_botilleria,req.id_usuario);
        if(!estaVacio(respuesta)){
            next();
        }   
        else{
            res.status(500).json({mensaje:'Permisos denegados'});
        }
    }catch(error){
        res.status(500).json({login:false, error});
    }
    
}

const validarPertenencia = async (req, res, next) => {
    try{
        if(req.id_usuario == req.params.id_usuario){
            next();
        }   
        else{
            res.status(500).json({mensaje:'Permisos denegados'});
        }
    }catch(error){
        res.status(500).json({login:false, error});
    }
    
}

module.exports = {
    mostrarBotilleriasController,
    buscarBotilleriasPorDuenoController,
    buscarBotilleriaController,
    crearBotilleriaController,
    actualizarBotilleriaController,
    eliminarBotilleriaController,
    validarPertenenciaADueno,
    validarPertenencia
}