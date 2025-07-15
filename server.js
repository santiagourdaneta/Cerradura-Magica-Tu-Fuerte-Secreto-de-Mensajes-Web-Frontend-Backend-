const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express(); // Creamos a nuestro robot Express
const PORT = 3000; // Esta es la puerta secreta de nuestro fuerte (dirección)

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// --- ¡NUEVO CÓDIGO AQUÍ! ---
// Permite al robot servir archivos estáticos (como HTML, CSS, JS) desde la carpeta principal del proyecto
app.use(express.static(path.join(__dirname)));

// Cuando alguien visite la dirección principal (ej: http://localhost:3000/), el robot enviará index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// --- FIN DEL CÓDIGO NUEVO --

const mensajesFilePath = path.join(__dirname, 'mensajes.json');

app.get('/mensajes', (req, res) => {
    fs.readFile(mensajesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer mensajes:', err);
            return res.status(500).json({ error: 'No se pudieron obtener los mensajes.' });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/mensajes', (req, res) => {
    const nuevoMensaje = req.body;
    fs.readFile(mensajesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer mensajes:', err);
            return res.status(500).json({ error: 'No se pudo guardar el mensaje.' });
        }
        const mensajes = JSON.parse(data);
        mensajes.push(nuevoMensaje);
        fs.writeFile(mensajesFilePath, JSON.stringify(mensajes, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir mensajes:', err);
                return res.status(500).json({ error: 'No se pudo guardar el mensaje.' });
            }
            res.status(201).json(nuevoMensaje);
        });
    });
});

// ¡NUEVO: Esto hace que el robot solo se encienda si lo ejecutamos directamente!
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Robot escuchando en la puerta http://localhost:${PORT}`);
    });
}

// ¡Esto es para que Jest pueda tomar una "copia" del robot para probarlo!
module.exports = { app };