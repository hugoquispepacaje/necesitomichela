const validator = require('validatorjs');

const validacionRegistro = (peticion) =>{
    let reglas = {
        nombre_usuario: 'required|max:45|string',
        contrasena: 'required|max:45|string',
        nombre: 'required|max:45|string',
        apellido: 'required|max:45|string',
        correo: 'required|max:45|email'
    };
    let mensajes = {
        max: {
            string: 'El campo :attribute debe tener maximo :max caracteres.',
            numeric: 'El campo :attribute no debe sobrepasar :max.'
        },
        email: 'El campo :attribute debe tener formato correo@correo.com',
        required: 'El campo :attribute es obligatorio',
        string: 'El campo :attribute debe ser string'
    }
    
    let validation = new validator(peticion, reglas, mensajes);
    return validation;
}

const validacionLogin = (peticion) =>{
    let reglas = {
        nombre_usuario: 'required|max:45|string',
        contrasena: 'required|string',
    };
    let mensajes = {
        max: {
            string: 'El campo :attribute debe tener maximo :max caracteres.',
            numeric: 'El campo :attribute no debe sobrepasar :max.'
        },
        required: 'El campo :attribute es obligatorio',
        string: 'El campo :attribute debe ser string'
    }
    
    let validation = new validator(peticion, reglas, mensajes);
    return validation;
}
module.exports = {
    validacionRegistro,
    validacionLogin
};
