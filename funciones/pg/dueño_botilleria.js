const { pool } = require('./conexion');
const {generarCadenaEncriptada} = require('../bcrypt.js');

const buscarDueñoPorNombreUsuario = async (nombre_usuario) => {
    try {
        var respuesta = await pool.query('select * from dueño_botilleria where nombre_usuario=$1', [nombre_usuario]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}
const buscarDueñoPorCorreo = async (correo) => {
    try {
        var respuesta = await pool.query('select * from dueño_botilleria where correo=$1', [correo]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const registroDueño = async (peticion) => {
    var {nombre_usuario, contrasena, nombre, apellido, correo} = peticion;
    contrasena = await generarCadenaEncriptada(contrasena);
    try {
        var respuesta = await pool.query(`insert into dueño_botilleria (nombre_usuario, contrasena, nombre, apellido, correo) 
        values ($1, $2, $3, $4, $5) RETURNING *`, [nombre_usuario, contrasena, nombre, apellido, correo]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}
const registroValidacionCorreo = async (datos) => {
    var {codigo, id_usuario} = datos;
    try {
        var respuesta = await pool.query(`insert into email_confirmacion (codigo, id_usuario) 
        values ($1, $2) RETURNING *`, [codigo, id_usuario]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}
const verificarCodigo = async(codigo) => {
    try {
        var respuesta = await pool.query('select * from email_confirmacion where codigo = $1', [codigo]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}
const activarEstadoDueño = async(id_dueño) => {
    try {
        var respuesta = await pool.query('UPDATE dueño_botilleria SET activo = true WHERE id = $1', [id_dueño]);
        return respuesta;
    }
    catch (error) {
        return error;
    }
}
const eliminarCodigoVerificacion = async(id) => {
    try {
        var respuesta = await pool.query('DELETE from email_confirmacion WHERE id = $1', [id]);
        return respuesta;
    }
    catch (error) {
        return error;
    }
}

module.exports = {
    registroDueño,
    registroValidacionCorreo,
    verificarCodigo,
    activarEstadoDueño,
    eliminarCodigoVerificacion,
    buscarDueñoPorNombreUsuario,
    buscarDueñoPorCorreo
 }