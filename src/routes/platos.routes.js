import { Router } from 'express';
import pool from '../database.js';

const router = Router();

// Ruta principal para escoger las opciones CRUD
router.get('/add', (req, res) => {
    res.render('platos/add');
});

// Ruta para agregar platos al menú a la base de datos
router.post('/add', async (req, res) => {
    try {
        const { nombre, descripcion, categoria, precio, imagen } = req.body;
        const newPlato = { nombre, descripcion, categoria, precio, imagen };
        await pool.query('INSERT INTO platos SET ?', [newPlato]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para listar los platos del menú de la base de datos
router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM platos');
        res.render('platos/list', { platos: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener los datos del plato a editar de la base de datos
router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [platos] = await pool.query('SELECT * FROM platos WHERE id = ?', [id]);
        const platosEdit = platos[0];
        res.render('platos/edit', { platos: platosEdit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para editar el plato de la base de datos
router.post('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Asegúrate de extraer el id de req.params
        const { nombre, descripcion, categoria, precio, imagen } = req.body;
        const editPlato = { nombre, descripcion, categoria, precio, imagen };
        await pool.query('UPDATE platos SET ? WHERE id = ?', [editPlato, id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//Ruta para eliminar un plato de la base de datos del menu
router.get('/delete/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM platos WHERE id = ?', [id]);
        res.redirect('/list');
        
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }

});

/*Si bien esta ruta realiza la eliminacion del plato 
en la base de datos el metodo GET no es una buena practica. 
Si bien esto puede funcionar, es importante tener en cuenta 
que el estándar HTTP especifica que las solicitudes GET 
deben ser idempotentes, es decir, no deben modificar el estado 
del servidor. Las operaciones que modifican datos, 
como eliminar un registro, generalmente se manejan mejor 
con métodos POST, PUT o DELETE según la convención RESTful.
*/



export default router;
