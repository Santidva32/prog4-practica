const express = require('express');
const path = require('path');
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

app.post('/api/tareas', (req, res) => {
    console.log(req.body);
    res.json({mensaje: 'Enviando desde el front al back °°°'});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});