//Inicializa los modelos de datos
const Product = require('../models/product.model');
const ProductCart = require('../models/cart.model');


//Modulo que agrega productos al carrito
exports.add = function(req, res){
    
    console.log("add to cart");

    //Consulta a MongoDB
    Product.findOne({_id: req.body.id}).exec(function (err, product) {
        if (err) { console.log("Error:", err); return; }
        
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
                if( err ){ console.log('Error: ', err); return; }
                
                console.log("Successfully added a product. :)");
                res.redirect("/cart");
                
            });
        }
        else
        {
            console.log("no hay stock");
            
            //Envia mensaje que no hay stock a traves de js alert y redirecciona
            res.send("<script>alert('No hay stock');window.location.href = '/products/show/"+req.body.id+"'</script>");
        }
       
    });
};

//Modulo que muestra todos los productos agregados al carrito
exports.list = function(req,res){

    ProductCart.find({}).exec(function(err, products){
        if( err ){ console.log('Error: ', err); return; }
        console.log("The CART");
        res.render('../views/shopping_cart/index', {products: products} );
        
    });
};

//Modulo que elimina un producto del carrito
exports.delete = function(req, res){

    ProductCart.remove({_id: req.params.id}, function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Product deleted!");
        res.redirect("/cart");
    });
    
};