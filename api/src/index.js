const server  = require('./app');  // Importamos el servidor.
const { conn } = require('./DB_connection');  // Importamos la conexión a la base de datos.

conn.sync({ force: true }).then(() => {
    console.log('Connection established')  // Si todo sale bien, la conexión a la DB se hizo exitosa.
    server.listen(3001, () => {  // Lo ponemos a escuchar.
        console.log('Server listening on PORT 3001')  // Se imprime en la consola.
    })
}).catch((error) => { console.log('Error al conectar', error) })  // Maneja error de sincronización o inicialización del server.

//TODO: SINCRONIZAMOS LA DB conn.sync({ force: true }) LO QUE INDICA QUE SE RECREA LA DB EN CADA REINICIO DEL SERVIDOR.