const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const enviarCorreoVerificacion = (correo, codigo) => {
    let configuracion_correo = asignarContenidoCorreo(correo, 'Verificacion de correo', dibujarHtmlValidacion(codigo))
    return enviarCorreo(configuracion_correo)
}

const asignarContenidoCorreo = (correo_destino, asunto, contenido) => {
    let configuracion_correo = {
        from: process.env.EMAIL_FROM,
        to: correo_destino,
        subject: asunto,
        html:contenido
    }
    return configuracion_correo
};

const enviarCorreo = (configuracion_correo) => {
    transporter.sendMail(configuracion_correo,(error, respuesta)=>{
        if(error){
            return error;
        } else{
            return respuesta;
        }
    });
}

const dibujarHtmlValidacion = (codigo) => {
    return(`
    <h1>Verificacion de correo</h1>
    <ul>
        <li>Para validar su correo ingrese al siguiente link: <a href="${process.env.FRONTEND}/verificacion_correo/${codigo}">Validar correo</a></li>
    </ul>
    `) 
};

module.exports = {
    enviarCorreoVerificacion
}