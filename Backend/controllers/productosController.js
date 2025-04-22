const db = require('../config/db');

exports.createproducto = async (req, res) => {
    const { nombre, descripcion, precio, stock, imagen, categoria_id } = req.body;
  
    try {
      const [result] = await db.execute(
        'INSERT INTO productos (nombre, descripcion, precio, stock, imagen, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, descripcion, precio, stock, imagen, categoria_id]
      );
  
      res.status(201).json({ 
        id: result.insertId, 
        nombre,
        descripcion,
        precio,
        stock,
        imagen,
        categoria_id
      });
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ error: 'Error al crear el producto' });
    }
};

exports.listaempresa = async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT 
          p.id_producto,
          p.nombre,
          p.descripcion,
          p.precio,
          p.stock,
          p.imagen,
          c.nombre AS categoria
        FROM productos p
        LEFT JOIN categorias c ON c.id_categoria = p.categoria_id
      `);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener los productos con categoría:', error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
};
exports.productoByid = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [rows] = await db.execute(
        'SELECT * FROM productos WHERE id_producto = ?',
        [id]
      );
  
      if (rows.length) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
};
exports.editarEmpresa = async (req, res) => {
    const { nombre, descripcion, precio, stock, imagen, categoria_id } = req.body;
    const { id } = req.params;
  
    try {
      const [result] = await db.execute(`
        UPDATE productos SET 
          nombre = ?, 
          descripcion = ?, 
          precio = ?, 
          stock = ?, 
          imagen = ?, 
          categoria_id = ? 
        WHERE id_producto = ?
      `, [nombre, descripcion, precio, stock, imagen, categoria_id, id]);
  
      result.affectedRows
        ? res.json({ id, nombre, descripcion, precio, stock, imagen, categoria_id })
        : res.status(404).json({ message: 'Producto no encontrado' });
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  };
exports.deleteItem = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await db.execute('DELETE FROM productos WHERE id_producto = ?', [id]);
  
      if (result.affectedRows) {
        res.json({ message: 'Producto eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};