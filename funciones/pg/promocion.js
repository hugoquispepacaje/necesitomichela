const { pool } = require('./conexion');

const crearPromocion = async (peticion) => {
    let { id_botilleria, url_imagen, nombre, precio } = peticion;
    try {
        let respuesta = await pool.query(`INSERT INTO promocion(id_botilleria, url_imagen, nombre, precio)
            VALUES ($1, $2, $3, $4) RETURNING *`, [id_botilleria, url_imagen, nombre, precio]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const buscarPromocion = async (id_promocion) => {
    try {
        let respuesta = await pool.query('select * from promocion where id=$1', [id_promocion]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const buscarPromocionesPorBotilleria = async (id_botilleria) => {
    try {
        let respuesta = await pool.query('select * from promocion where id_botilleria=$1', [id_botilleria]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const mostrarPromociones = async () => {
    try {
        let respuesta = await pool.query('select * from promocion');
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const actualizarPromocion = async (peticion, id_promocion) => {
    let { url_imagen, nombre, precio } = peticion;
    try {
        let respuesta = await pool.query(`UPDATE promocion SET url_imagen=$2, nombre=$3, precio=$4 WHERE id=$1 RETURNING *`,
            [id_promocion, url_imagen, nombre, precio]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const eliminarPromocion = async (id_promocion) => {
    try {
        let respuesta = await pool.query('DELETE FROM promocion WHERE id=$1', [id_promocion]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

module.exports = {
    crearPromocion,
    buscarPromocion,
    buscarPromocionesPorBotilleria,
    mostrarPromociones,
    actualizarPromocion,
    eliminarPromocion
}