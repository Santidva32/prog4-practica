const express = require('express');
const path = require('path');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Permite que el servidor entienda JSON
app.use(express.json());

// Le dice a Express que sirva los archivos de /public automáticamente
app.use(express.static(path.join(__dirname, '../public')));

// Ruta de prueba para verificar que el servidor funciona
app.get('/api/ping', (req, res) => {
    res.json({ mensaje: 'El servidor funciona ✅' });
});

app.post('/api/tareas', async (req, res) => {
    try {
        const { tarea } = req.body;
        const resultado = await pool.query(
            'INSERT INTO tareas (descripcion) VALUES ($1) RETURNING *', 
            [tarea]
        );
        res.json(resultado.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/tareas', async (req, res) => {
    try{
        const resultado = await pool.query('SELECT * FROM tareas');
        res.json(resultado.rows);
    }catch (error) {
        res.status(500).json({ error: error.message })
    }
});

app.delete('/api/tareas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM tareas WHERE id = $1', [id]);
        res.json({ mensaje: 'Tarea eliminada!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/tareas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { tarea } = req.body;
        await pool.query('UPDATE tareas SET descripcion = $1 WHERE id = $2', [tarea, id]);
        res.json({ mensaje: 'Tarea actualizada!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});