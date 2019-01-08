//Inicializa el modelo de datos
const Product = require('../models/product.model');

//Lista todos los productos PROMISES
function product_listp(req){
    return new Promise(function(resolve,reject){
        Product.find({}).exec(function(err, products){
            if( err ){ console.log('Error: ', err); reject(); }
            console.log("The INDEX");
            resolve(products);
        });
    });
}

//Modulo que guarda el producto en MongoDB PROMISES
function savep(req){
    return new Promise(function(resolve,reject){
        var product = new Product({
            name: req.body.name,
            price: req.body.price,
            qty: req.body.qty 
        });
        
        product.save(function(err){
            if( err ){ console.log('Error: ', err); reject(); }
            
            console.log("Successfully created a product. :)");
            resolve();  
        });
    })
}

//Modulo que muestra el detalle de un producto en especifico PROMISES
function showp(req){
    return new Promise(function(resolve,reject){
        Product.findOne({_id: req.params.id}).exec(function(err, product){
            if( err ){ console.log('Error: ', err); reject(); }
            resolve(product);
        });
    })
}

//Lista todos los productos
exports.product_list = function(req, res){
    product_listp(req).then(function(products){
        res.render('../views/index', {products: products} );  
    });
};

//Modulo que redirecciona a la vista para crear un producto
exports.create = function(req, res){

    res.render('../views/product/create');
};
 
//Modulo que guarda el producto en MongoDB
exports.save = function(req, res){
    savep(req).then(function(){
        res.redirect("/products");
    })           
};

//Modulo que muestra el detalle de un producto en especifico 
exports.show = function(req, res){
    showp(req).then(function(product){
        res.render('../views/product/show', {product: product} );
    });
};