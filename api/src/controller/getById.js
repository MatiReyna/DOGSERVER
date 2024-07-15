const { getAllDogs } = require('./getAllDog');

const getById = async (id) => {  // Función que devuelve el perro con el id que se pasa por parámetro.

    const allDogs = await getAllDogs();  // Obtenemos la lista completa de perros.

    // Filtramos al perro con el id pasado por parámetro.
    const dogId = isNaN(id) ? id : parseInt(id);
    const dog = allDogs.find((dog) => dog.id === dogId);

    if (dog) {  // Si lo encontro.
        return dog  // Devuelve el objeto solo y no dentro del arreglo.
    } else {
        return { error: 'Dog not found' }
    }
};

module.exports = {
    getById
}