const { pool } = require('./conexion');

const crearProducto = async (peticion) => {
    let { id_botilleria, url_imagen, nombre, precio } = peticion;
    try {
        let respuesta = await pool.query(`INSERT INTO producto(id_botilleria, url_imagen, nombre, precio)
            VALUES ($1, $2, $3, $4) RETURNING *`, [id_botilleria, url_imagen, nombre, precio]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const buscarProducto = async (id_producto) => {
    try {
        let respuesta = await pool.query('select * from producto where id=$1', [id_producto]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const buscarProductosPorBotilleria = async (id_botilleria) => {
    try {
        let respuesta = await pool.query('select * from producto where id_botilleria=$1', [id_botilleria]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const mostrarProductos = async () => {
    try {
        let respuesta = await pool.query('select * from producto');
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const actualizarProducto = async (peticion, id_producto) => {
    let { url_imagen, nombre, precio } = peticion;
    try {
        let respuesta = await pool.query(`UPDATE producto SET url_imagen=$2, nombre=$3, precio=$4 WHERE id=$1 RETURNING *`,
            [id_producto, url_imagen, nombre, precio]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const eliminarProducto = async (id_producto) => {
    try {
        let respuesta = await pool.query('DELETE FROM producto WHERE id=$1', [id_producto]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

module.exports = {
    crearProducto,
    buscarProducto,
    buscarProductosPorBotilleria,
    mostrarProductos,
    actualizarProducto,
    eliminarProducto
}