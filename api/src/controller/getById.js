const { getAllDogs } = require('./getAllDog');

const getById = async (id) => {  // Función que devuelve el perro con el id que se pasa por parámetro.

    const allDogs = await getAllDogs();  // Obtenemos la lista completa de perros.

    // Filtramos al perro con el id pasado por parámetro.
    const filteredDog = allDogs.filter((dog) => dog.id === parseInt(id));

    if (filteredDog.length > 0) {  // Si lo encontro.
        return filteredDog[0]  // Devuelve el objeto solo y no dentro del arreglo.
    } else {
        return 'Dog not found'
    }
};

module.exports = {
    getById
}