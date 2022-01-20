const { enviarCorreoVerificacion } = require('../funciones/nodemailder.js');
const { registroDueño, registroValidacionCorreo } = require('../funciones/pg/dueño_botilleria.js');
const { verificarCodigo, activarEstadoDueño } = require('../funciones/pg/dueño_botilleria.js');
const { eliminarCodigoVerificacion, buscarDueñoPorNombreUsuario, buscarDueñoPorCorreo } = require('../funciones/pg/dueño_botilleria.js');
const { validacionRegistro, validacionLogin } = require('../funciones/validator/usuario.js');
const { generarCodigoAleatorio, estaVacio, esNull } = require('../funciones/general.js');
const { generarToken } = require('../funciones/jwt.js');
const { resolverCadenaEncriptada } = require('../funciones/bcrypt.js');

const test = (req, res) => {
    res.status(200).json(req.id_usuario);
}

const login = async (req, res) => {
    var validacion = validacionLogin(req.body);
    if (validacion.passes()) {
        var respuesta_buscar_dueño = await buscarDueñoPorNombreUsuario(req.body.nombre_usuario);
        if (!estaVacio(respuesta_buscar_dueño)) {
            if (await resolverCadenaEncriptada(req.body.contrasena, respuesta_buscar_dueño[0].contrasena)) {
                if (respuesta_buscar_dueño[0].activo) {
                    res.status(200).json({ login: true, activo: respuesta_buscar_dueño[0].activo, token: generarToken(respuesta_buscar_dueño[0].id, respuesta_buscar_dueño[0].nombre_usuario) });
                } else {
                    res.status(200).json({ login: true, activo: respuesta_buscar_dueño[0].activo });
                }

            }
            else {
                res.status(500).json({ login: false, error: 'Contraseña incorrecta' });
            }
        }
        else {
            res.status(500).json({ login: false, error: 'No se encontro nombre de usuario' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }
}

const registro = async (req, res) => {

    let validacion = validacionRegistro(req.body);
    if (validacion.passes()) {
        let respuesta_buscar_por_nombre_usuario = await buscarDueñoPorNombreUsuario(req.body.nombre_usuario);
        if (estaVacio(respuesta_buscar_por_nombre_usuario)) {
            let respuesta_buscar_por_correo = await buscarDueñoPorCorreo(req.body.correo);
            if (estaVacio(respuesta_buscar_por_correo)) {
                let respuesta_registro_dueño = await registroDueño(req.body);
                if (!esNull(respuesta_registro_dueño[0].id)) {
                    let datos_verificacion = inicializarVerificacionCorreo(generarCodigoAleatorio(30), respuesta_registro_dueño[0].id);
                    let respuesta_registro_verificacion = await registroValidacionCorreo(datos_verificacion);
                    enviarCorreoVerificacion(respuesta_registro_dueño[0].correo, respuesta_registro_verificacion[0].codigo);
                    res.status(200).json({ registro: true });
                }
                else {
                    res.status(500).json(respuesta_registro_dueño);
                }
            }
            else {
                res.status(500).json({ error: 'Correo en uso' });
            }
        }
        else {
            res.status(500).json({ error: 'Nombre de usuario en uso' });
        }
    }
    else {
        res.status(500).json(validacion.errors.all());
    }

}
const verificarCorreo = async (req, res) => {
    var codigo_verificacion = req.params.codigo;
    var respuesta_existencia_codigo = await verificarCodigo(codigo_verificacion);
    if (!estaVacio(respuesta_existencia_codigo)) {
        respuesta_activar_dueño = await activarEstadoDueño(respuesta_existencia_codigo[0].id_usuario);
        respuesta_eliminar_codigo = await eliminarCodigoVerificacion(respuesta_existencia_codigo[0].id);
        res.status(200).json('Cuenta activada');
    }
    else {
        res.status(500).json('No se encontro codigo');
    }

}

var inicializarVerificacionCorreo = (codigo, id_usuario) => {
    return { "codigo": codigo, "id_usuario": id_usuario };
}

module.exports = {
    login,
    registro,
    test,
    verificarCorreo
}
