const express = require('express');
const router = express.Router();

// Inicializa el controlador asociado
const cart_controller = require('../controllers/cart.controller');


router.post('/add', cart_controller.add);
router.get('/',cart_controller.list)
router.get('/delete/:id', cart_controller.delete);


module.exports = router