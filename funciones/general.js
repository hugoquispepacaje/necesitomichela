const generarCodigoAleatorio = (largo) =>{
    var resultado = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var largo_caracteres = caracteres.length;

    for ( var i = 0; i < largo; i++ ) {
        resultado += caracteres.charAt(Math.floor(Math.random() * largo_caracteres));
    }
    return resultado;
}

var estaVacio = (objeto) => {
    return Object.keys(objeto).length === 0;
}

var esNull = (varible) => {
    return varible == null;
}

module.exports = {
    generarCodigoAleatorio,
    estaVacio,
    esNull
 }