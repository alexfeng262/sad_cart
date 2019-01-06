//Link inicial http://localhost:1234/products

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//Inicializa las rutas tanto para el manejo de productos como para el carrito
const product = require('./routes/product.route');
const cart = require('./routes/cart.route');

// Inicializa el app express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//uso de las rutas
app.use('/products', product);
app.use('/cart',cart);

app.set('views', path.join(__dirname, 'views'));

//Configura el motor de renderizado para las vistas
app.set('view engine', 'twig');

// Configura la conexion a MongoDB con Mongoose
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://sad_user:sad1234@ds149744.mlab.com:49744/sad_cart';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Puerto de conexion
let port = 1234;

//Inicializa el servidor http a espera de peticiones
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

