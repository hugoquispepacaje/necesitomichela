const { pool } = require('./conexion');

const crearPromocionProducto = async (peticion) => {
    let { id_producto, id_promocion, cantidad } = peticion;
    try {
        let respuesta = await pool.query(`INSERT INTO promocion_producto(id_producto, id_promocion, cantidad)
            VALUES ($1, $2, $3) RETURNING *`, [id_producto, id_promocion, cantidad]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const buscarPromocionProducto = async (id_promocion_producto) => {
    try {
        let respuesta = await pool.query('select * from promocion_producto where id=$1', [id_promocion_producto]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const buscarProductosEnPromocion = async (id_promocion) => {
    try {
        let respuesta = await pool.query('select * from promocion_producto where id_promocion=$1', [id_promocion]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const actualizarPromocionProducto = async (peticion, id_promocion_producto) => {
    let { cantidad } = peticion;
    try {
        let respuesta = await pool.query(`UPDATE promocion_producto SET cantidad=$2 WHERE id=$1 RETURNING *`,
            [id_promocion_producto, cantidad]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const eliminarPromocionProducto = async (id_promocion_producto) => {
    try {
        let respuesta = await pool.query('DELETE FROM promocion_producto WHERE id=$1', [id_promocion_producto]);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

const mostrarProductosEnPromocion = async (id_promocion) => {
    try {
        let respuesta = await pool.query(`select a.id, b.nombre, b.precio, a.cantidad 
        from promocion_producto a, producto b 
        where a.id_producto = b.id and a.id_promocion = ${id_promocion}`);
        return respuesta.rows;
    }
    catch (error) {
        return error.detail;
    }
}

module.exports = {
    crearPromocionProducto,
    buscarPromocionProducto,
    buscarProductosEnPromocion,
    actualizarPromocionProducto,
    eliminarPromocionProducto,
    mostrarProductosEnPromocion,
}