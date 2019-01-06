const express = require('express');
const router = express.Router();

// Inicializa el controlador asociado
const product_controller = require('../controllers/product.controller');

router.get('/create', product_controller.create);
router.post('/save', product_controller.save);
//router.get('/:id', product_controller.product_details);
router.get('/show/:id', product_controller.show);
router.get('/', product_controller.product_list);

module.exports = router;