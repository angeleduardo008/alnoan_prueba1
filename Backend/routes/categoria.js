const express = require('express');
const router = express.Router();
const productoController = require('../controllers/categoriasController');

router.get('/', productoController.listaCategoria); // Listar productos
router.get('/:id', productoController.categoriaById); // Buscar por ID
router.post('/new', productoController.createCategoria); // Crear nuevo producto
router.put('/editar/:id', productoController.editarcategoria); // Editar por ID
router.delete('/eliminar/:id', productoController.deleteCategiria); // Eliminar por ID

module.exports = router;