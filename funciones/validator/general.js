const validator = require('validatorjs');

const validacionIdentificador = (peticion) => {
    let reglas = {
        dato: 'required|numeric',
    };
    let mensajes = {
        numeric: 'El campo :attribute debe ser numerico',
        required: 'El campo :attribute es obligatorio',
    }

    let validation = new validator(peticion, reglas, mensajes);
    return validation;
}

module.exports = {
    
    validacionIdentificador
};