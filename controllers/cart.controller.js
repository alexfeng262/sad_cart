//Inicializa los modelos de datos
const Product = require('../models/product.model');
const ProductCart = require('../models/cart.model');

//Modulo que agrega productos al carrito PROMISES
function addp(req){
    return new Promise(function(resolve,reject){
        console.log("add to cart");
         //Consulta a MongoDB
        Product.findOne({_id: req.body.id}).exec(function (err, product) {
            if (err) { console.log("Error:", err); reject(); }
            
            //Verifica si hay stock
            if(product.qty>=req.body.item)
            {
                var product = new ProductCart({
                    prod_id: product._id,
                    name: product.name,
                    price: product.price,
                    qty: req.body.item
                });
                
                //Guarda en MongoDB
                product.save(function(err){
                    if( err ){ console.log('Error: ', err); reject(); }
                    
                    console.log("Successfully added a product. :)");
                    resolve(true);
                });
            }
            else
            {
                console.log("no hay stock");
                resolve(false);
            }
        });
    });
}

//Modulo que muestra todos los productos agregados al carrito PROMISES

function listp (){
    return new Promise(function (resolve, reject){
        ProductCart.find({}).exec(function(err, products){
            if( err ){ console.log('Error: ', err); reject(); }
            console.log("The CART");
            resolve(products);
            //console.log("Post REsolve");
        });
    });
};

//Modulo que elimina un producto del carrito PROMISE
function deletep(req){
    
    return new Promise(function(resolve,reject){
        ProductCart.remove({_id: req.params.id}, function(err){
            if( err ){ console.log('Error: ', err); reject(); }
            
            console.log("Product deleted!");
            resolve();
        });
    });
}

//Modulo que agrega productos al carrito
exports.add = function(req, res){
    addp(req).then(function(val){
        if(val)
            res.redirect("/cart"); 
        else
            //Envia mensaje que no hay stock a traves de js alert y redirecciona
            res.send("<script>alert('No hay stock');window.location.href = '/products/show/"+req.body.id+"'</script>");
    });
    
};

//Modulo que muestra todos los productos agregados al carrito
exports.list = function(req, res){
    listp().then(function (products){
        //console.log("then");
        res.render('../views/shopping_cart/index', {products: products} );
    });
};


//Modulo que elimina un producto del carrito
exports.delete = function(req, res){

   deletep(req).then(function(){
       res.redirect("/cart");
   });
};

