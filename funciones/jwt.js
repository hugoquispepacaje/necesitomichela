const jwt = require('jsonwebtoken')

const generarToken = (id_usuario,nombre_usuario) => {
    const token = jwt.sign({id:id_usuario, nombre_usuario:nombre_usuario}, process.env.JWT_SEED);
    return token
}
const validarToken = (req, res, next) => {
    try{
        const token = req.headers['x-access-token'];
        const decodificacion = jwt.verify(token,process.env.JWT_SEED);
        req.id_usuario = decodificacion.id;
        next();
    }catch(error){
        res.status(500).json({login:false, error});
    }
    
}
module.exports = {
    generarToken,
    validarToken
}