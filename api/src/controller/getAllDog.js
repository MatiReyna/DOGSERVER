const { getApiDogs } = require('./getApiDog');
const { getDbDogs } = require('./getDbDog');

const getAllDogs = async () => {

    // Ejecutamos los controladores para que nos traigan los perros.
    const apiDogs = await getApiDogs();
    const dbDogs = await getDbDogs();

    // Unimos las dos fuentes de datos para que sea una sola lista.
    const allDogs = dbDogs.concat(apiDogs);

    return allDogs;  // Se retornan todos los perros.
};

module.exports = {
    getAllDogs
}