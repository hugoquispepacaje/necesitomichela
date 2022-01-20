const validator = require('validatorjs');

const validacionCrear = (peticion) => {
    let reglas = {
        id_botilleria: 'required|numeric',
        url_imagen: 'required|max:100|url',
        nombre: 'required|max:45|string',
        precio: 'required|numeric|min:0',
    };
    let mensajes = {
        max: {
            string: 'El campo :attribute debe tener maximo :max caracteres.',
            numeric: 'El campo :attribute no debe sobrepasar :max.'
        },
        min: {
            numeric: 'El campo :attribute debe ser mayor a :min.'
        },
        required: 'El campo :attribute es obligatorio',
        string: 'El campo :attribute debe ser string',
        numeric: 'El campo :attribute debe ser numerico',
        url: 'El campo :attribute debe tener formato de url'
    }

    let validation = new validator(peticion, reglas, mensajes);
    return validation;
}
const validacionActualizar = (peticion) => {
    let reglas = {
        id_promocion: 'required|numeric',
        url_imagen: 'required|max:100|url',
        nombre: 'required|max:45|string',
        precio: 'required|numeric|min:0',
    };
    let mensajes = {
        max: {
            string: 'El campo :attribute debe tener maximo :max caracteres.'
        },
        min: {
            numeric: 'El campo :attribute debe ser mayor a :min.'
        },
        string: 'El campo :attribute debe ser string',
        numeric: 'El campo :attribute debe ser numerico',
        url: 'El campo :attribute debe tener formato de url',
        required: 'El campo :attribute es obligatorio'
    }

    let validation = new validator(peticion, reglas, mensajes);
    return validation;
}

module.exports = {
    validacionCrear,
    validacionActualizar
};