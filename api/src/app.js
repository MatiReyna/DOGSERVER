const express = require('express');
const morgan = require('morgan');  // Middleware de registro de solicitud HTTP.
const router = require('./router/index');  // Enrutador.

const server = express();  // Instancia del servidor.

server.use(morgan('dev'));
server.use(express.json());  // Solicitud en formato JSON.
server.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Credentials', 'true');
    response.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    response.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

server.use('/', router);  // Configuracion de rutas.

server.use((error, request, response, next) => {  // Manejo de errores.
    console.error(error.stack);
    response.status(500).send('¡Something went wrong!')
});

module.exports = server;