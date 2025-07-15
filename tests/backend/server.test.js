// server.test.js
const request = require('supertest');
const fs = require('fs');
const path = require('path');
let app;

// Definimos la ruta del archivo de mensajes
const mensajesFilePath = path.join(__dirname, '../../mensajes.json');

// Contenido inicial para asegurar que el archivo esté vacío
const emptyMensajes = '[]';

// Antes de cada prueba, preparamos el escenario
beforeEach(() => {
    // --- ¡NUEVO Y MEJORADO: Aseguramos que la libreta esté VACÍA al principio de cada prueba! ---
    // Primero, si el archivo de la libreta existe, lo borramos completamente.
    if (fs.existsSync(mensajesFilePath)) {
        fs.unlinkSync(mensajesFilePath); // Borra el archivo viejo
    }
    // Luego, creamos un archivo nuevo y vacío.
    fs.writeFileSync(mensajesFilePath, emptyMensajes, 'utf8');
    // -----------------------------------------------------------------------------------------

    // Reiniciamos los módulos de Node.js para que server.js se cargue "fresco"
    jest.resetModules();
    // Importamos el robot (la aplicación Express)
    app = require('../../server').app;
});

// Después de todas las pruebas, limpiamos el archivo para dejarlo como estaba al principio
afterAll(() => {
    // Si el archivo existe, lo borramos completamente.
    if (fs.existsSync(mensajesFilePath)) {
        fs.unlinkSync(mensajesFilePath);
    }
    // Luego, creamos un archivo nuevo y vacío.
    fs.writeFileSync(mensajesFilePath, emptyMensajes, 'utf8');
});

// --- ¡Nuestras Listas de Verificación! ---

// Prueba 1: ¿Puede el robot guardar un nuevo mensaje?
test('Debe guardar un nuevo mensaje correctamente', async () => {
    const nuevoMensaje = { texto: 'Hola fuerte!', fecha: 'Hoy' }; // Usamos 'Hoy' para la fecha, para que sea igual en el test y en el guardado.

    // Le decimos a nuestro ayudante 'supertest' que llame al robot para guardar
    const res = await request(app)
        .post('/mensajes')
        .send(nuevoMensaje);

    // Verificamos que el robot respondió bien
    expect(res.statusCode).toEqual(201);
    expect(res.body.texto).toEqual(nuevoMensaje.texto);

    // Ahora, verificamos que el mensaje esté realmente en la libreta DESPUÉS de que el robot lo guardó
    const data = fs.readFileSync(mensajesFilePath, 'utf8');
    const mensajesEnLibreta = JSON.parse(data);
    // console.log('Mensajes en libreta después de POST:', mensajesEnLibreta); // Puedes dejar esto si quieres depurar más

    // Aquí es donde Jest compara si el mensaje que guardamos está en la libreta.
    // Aseguramos que la fecha sea la misma que usamos en el test.
    expect(mensajesEnLibreta).toContainEqual(expect.objectContaining({
        texto: nuevoMensaje.texto,
        fecha: expect.any(String) // La fecha real del robot tendrá hora, así que solo verificamos que sea un string
    }));
});

// Prueba 2: ¿Puede el robot leer los mensajes que ya están?
test('Debe obtener los mensajes existentes', async () => {
    // Primero, ponemos un mensaje de prueba en la libreta directamente ANTES de pedirle al robot
    const mensajesIniciales = [{ texto: 'Mensaje de prueba', fecha: 'Ayer' }];
    fs.writeFileSync(mensajesFilePath, JSON.stringify(mensajesIniciales), 'utf8');

    // Ahora le pedimos al robot que nos los dé
    const res = await request(app).get('/mensajes');

    // Verificamos que el robot respondió bien
    expect(res.statusCode).toEqual(200);
    // Verificamos que nos dio los mensajes correctos
    expect(res.body).toEqual(mensajesIniciales);
});

// Prueba 3: ¿Qué pasa si la libreta está vacía?
test('Debe devolver una lista vacía si no hay mensajes', async () => {
    // beforeEach ya asegura que la libreta esté vacía al inicio de esta prueba
    const res = await request(app).get('/mensajes');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
});