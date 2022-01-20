let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');

require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

let usuario = require('./ruta/usuario.js');
let botilleria = require('./ruta/botilleria.js');
let producto = require('./ruta/producto.js');
let promocion = require('./ruta/promocion.js');
let promocion_producto = require('./ruta/promocion_producto.js');

app.use('/', usuario);
app.use('/botilleria', botilleria);
app.use('/producto', producto);
app.use('/promocion', promocion);
app.use('/promocion_producto', promocion_producto);

app.listen(process.env.PORT || 3000, function () {
  console.log('Servidor funcionando en el puerto: 3000');
});