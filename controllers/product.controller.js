//Inicializa el modelo de datos
const Product = require('../models/product.model');

//Lista todos los productos
exports.product_list = function(req, res){
    
    Product.find({}).exec(function(err, products){
        if( err ){ console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/index', {products: products} );  
    });
};

//Modulo que redirecciona a la vista para crear un producto
exports.create = function(req, res){

    res.render('../views/product/create');
};
 
//Modulo que guarda el producto en MongoDB
exports.save = function(req, res){

    var product = new Product({
        name: req.body.name,
        price: req.body.price,
        qty: req.body.qty 
    });
    
    product.save(function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Successfully created a product. :)");
        res.redirect("/products");
        
    });
};
//Modulo que muestra el detalle de un producto en especifico 
exports.show = function(req, res){
    Product.findOne({_id: req.params.id}).exec(function(err, product){
        if( err ){ console.log('Error: ', err); return; }
        
        res.render('../views/product/show', {product: product} );
    });
    
};