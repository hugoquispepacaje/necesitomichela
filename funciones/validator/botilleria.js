const validator = require('validatorjs');

const validacionCrear = (peticion) => {
    let reglas = {
        id_usuario: 'required|numeric',
        url_imagen: 'required|max:100|url',
        nombre: 'required|max:45|string',
        direccion: 'required|max:60|string',
        telefono: 'required|max:15|string',
        hora_apertura: 'required|string',
        hora_cierre: 'required|string',
        coordenada_latitud: 'required|numeric',
        coordenada_longitud: 'required|numeric',
    };
    let mensajes = {
        max: {
            string: 'El campo :attribute debe tener maximo :max caracteres.',
            numeric: 'El campo :attribute no debe sobrepasar :max.'
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
        id_botilleria: 'required|numeric',
        url_imagen: 'required|max:100|url',
        nombre: 'required|max:45|string',
        direccion: 'required|max:60|string',
        telefono: 'required|max:15|string',
        hora_apertura: 'required|string',
        hora_cierre: 'required|string',
        coordenada_latitud: 'required|numeric',
        coordenada_longitud: 'required|numeric',
    };
    let mensajes = {
        max: {
            string: 'El campo :attribute debe tener maximo :max caracteres.'
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