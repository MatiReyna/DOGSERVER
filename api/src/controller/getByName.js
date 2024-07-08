const { getAllDogs } = require('./getAllDog');
const { Dog, Temperament } = require('../DB_connection');

const getByName = async (name) => {  // Función que devuelve el perro con el name que se pasa por parámetro.

    const allDogs = getAllDogs();  // Obtenemos la lista completa de perros.

    // Filtramos los perros de la API que coincidan con el parámetro.
    const filteredDogsApi = allDogs.filter((dog) => dog.name.toLowerCase() === name.toLowerCase());

    // Buscamos en la DB los perros que coincidan con el parámetro.
    const filteredDogsDb = await Dog.findAll({
        where: { name: name },
        include: {  // Pero que también incluyan los temperamentos.
            model: Temperament,
            attributes: ['name'],  // Solamente los nombres.
            through: {
                attributes: []
            }
        }
    });

    return [ ...filteredDogsApi, ...filteredDogsDb ];
};

module.exports = {
    getByName
}