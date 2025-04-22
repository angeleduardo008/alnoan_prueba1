const db = require('../config/db');

exports.createCategoria  = async (req,res) =>{
    const { nombre } =  req.body;
     try {
        const { result } =  await db.execute(
            'INSERT INTO categorias(nombre) VALUES (?)',[nombre]
        );

        res.status(201).json({
            id: result.insertId,
            nombre
        });

     } catch (error) {
        console.error('error al  crear  categoria', error);
        res.status(500).json({ error: ' error al crear la categoria'})
     }
}

exports.listaCategoria =  async (req,res) => {
    try {
        const  [rows] =  await db.execute('SELECT * FROM categorias')
        res.status(200).json(rows);
    } catch (error) {
        console.error('error al abtener las categoria', error);
        res.status(500).json({error:  'error al  obtener las categoria'})
    }

}

exports.categoriaById = async (req,res) =>{
    const {id} = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM categorias WHERE id_categoria = ?',[id]);
        if(rows.length){
            res.status(200).json(rows[0]);
        }else{
            res.status(404).json({message :  'Categoria no encontrada'})
        }
    } catch (error) {
        console.error('Error al obtener categoria:', error);
        res.status(500).json({ error: 'Error al obtener categoria'});
    }
}
exports.editarcategoria = async (req,res) =>{
    const  {nombre} = req.body;
    const {id} = req.params;
    try {
        const [result] = await db.execute('UPDATE categorias SET nombre = ? WHERE id_categoria = ?',[nombre, id]);
        result.affectedRows
        ? res.json({id, nombre})
        : res.status(404).json({ message : 'categoria  no encontrada'})
    } catch (error) {
        console.error('Error al actualizar categoria:', error);
        res.status(500).json({ error: 'Error al actualizar categoria' });
    }
}
exports.deleteCategiria = async (req,res) =>{
    const {id} = req.params;
    try {
        const [result] = await db.execute('DELETE FROM categorias WHERE id_categoria = ?',[id])
        if(result.affectedRows){
            res.json({message: 'categoria eliminado correctamente'})
        }else{
            res.status(404).json({message: 'categoria no encontrado'})
        }
    } catch (error) {
        console.error('Error al eliminar categoria:', error);
        res.status(500).json({ error: 'Error al eliminar  categoria' });
    }
}