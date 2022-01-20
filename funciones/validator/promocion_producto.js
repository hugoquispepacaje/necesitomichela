const validator = require('validatorjs');

const validacionCrear = (peticion) => {
    let reglas = {
        id_promocion: 'required|numeric',
        id_producto: 'required|numeric',
        cantidad: 'required|numeric|min:0'
    };
    let mensajes = {
        required: 'El campo :attribute es obligatorio',
        numeric: 'El campo :attribute debe ser numerico',
        min: {
            numeric: 'El campo :attribute debe ser mayor a :min.'
        },
    }
    let validation = new validator(peticion, reglas, mensajes);
    return validation;
}
const validacionActualizar = (peticion) => {
    let reglas = {
        id_promocion_producto: 'required|numeric',
        cantidad: 'required|numeric|min:0'
    };
    let mensajes = {
        required: 'El campo :attribute es obligatorio',
        numeric: 'El campo :attribute debe ser numerico',
        min: {
            numeric: 'El campo :attribute debe ser mayor a :min.'
        },
    }
    let validation = new validator(peticion, reglas, mensajes);
    return validation;
}

module.exports = {
    validacionCrear,
    validacionActualizar
};