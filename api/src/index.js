const server  = require('./app');  // Importamos el servidor.

server.listen(3001, () => {  // Lo ponemos a escuchar.
    console.log('Server listening on PORT 3001')  // Se imprime en la consola.
});