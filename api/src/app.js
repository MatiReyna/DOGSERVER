const express = require('express');
const cros = require('cros');
const morgan = require('morgan');  // Middleware de registro de solicitud HTTP.
const router = require('./router/index');  // Enrutador.

const server = express();  // Instancia del servidor.

server.use(morgan('dev'));
server.use(express.json());  // Solicitud en formato JSON.
server.use(cros({ credentials: true, origin: '*' }));  // Usando el middleware cros.

server.use('/', router);  // Configuracion de rutas.

server.use((request, response, next) => {  // Manejo de errores por rutas no encontradas.
    response.status(404).json({ error: 'Resource not found' })
});

server.use((error, request, response, next) => {  // Manejo de errores.
    console.error(error.stack);
    response.status(500).json({ error: 'Something went wrong!' })
});

module.exports = server;