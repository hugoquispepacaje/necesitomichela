const { pool } = require('./conexion');

const crearBotilleria = async (peticion) => {
    let { id_usuario, url_imagen, nombre, direccion, telefono,
        coordenada_latitud, coordenada_longitud, hora_apertura, hora_cierre } = peticion;
    try {
        let respuesta = await pool.query(`INSERT INTO botilleria(id_usuario, url_imagen, nombre, direccion, 
            telefono, coordenada_latitud, coordenada_longitud, hora_apertura, hora_cierre) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [id_usuario, url_imagen, nombre, direccion, telefono,
                coordenada_latitud, coordenada_longitud, hora_apertura, hora_cierre]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const buscarBotilleria = async (id_botilleria) => {
    try {
        let respuesta = await pool.query('select * from botilleria where id=$1', [id_botilleria]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const buscarBotilleriasPorDueno = async (id_usuario) => {
    try {
        let respuesta = await pool.query('select * from botilleria where id_usuario=$1', [id_usuario]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const mostrarBotillerias = async () => {
    try {
        let respuesta = await pool.query('select * from botilleria');
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const actualizarBotilleria = async (peticion, id_botilleria) => {
    let { url_imagen, nombre, direccion, telefono,
        coordenada_latitud, coordenada_longitud, hora_apertura, hora_cierre } = peticion;
    try {
        let respuesta = await pool.query(`UPDATE botilleria SET url_imagen=$2, nombre=$3, direccion=$4, telefono=$5, coordenada_latitud=$6, 
        coordenada_longitud=$7, hora_apertura=$8, hora_cierre=$9 WHERE id=$1 RETURNING *`,
            [id_botilleria, url_imagen, nombre, direccion, telefono,
                coordenada_latitud, coordenada_longitud, hora_apertura, hora_cierre]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const eliminarBotilleria = async (id_botilleria) => {
    try {
        let respuesta = await pool.query('DELETE FROM botilleria WHERE id=$1', [id_botilleria]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const perteneceADueno = async (id_botilleria, id_dueno) => {
    try {
        let respuesta = await pool.query('select b.nombre_usuario, a.nombre from botilleria a inner join dueño_botilleria b on b.id = a.id_usuario and b.id=$2 and a.id=$1', [id_botilleria,id_dueno]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}
module.exports = {
    crearBotilleria,
    buscarBotilleria,
    buscarBotilleriasPorDueno,
    mostrarBotillerias,
    actualizarBotilleria,
    eliminarBotilleria,
    perteneceADueno
}