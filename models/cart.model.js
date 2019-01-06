const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProductCartSchema = new Schema({
    prod_id: {type: String, required: true, max: 100},
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    qty: {type: Number, required: true},
});


// Exporta el modelo
module.exports = mongoose.model('Product_cart', ProductCartSchema);