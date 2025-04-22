const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productosController');

router.get('/', productoController.listaempresa); // Listar productos
router.get('/:id', productoController.productoByid); // Buscar por ID
router.post('/new', productoController.createproducto); // Crear nuevo producto
router.put('/editar/:id', productoController.editarEmpresa); // Editar por ID
router.delete('/eliminar/:id', productoController.deleteItem); // Eliminar por ID

module.exports = router;
