const { getAllDogs } = require('./getAllDog');
const { Dog, Temperament } = require('../DB_connection');
const { Op } = require('sequelize');

const getByName = async (name) => {  // Función que devuelve el perro con el name que se pasa por parámetro.

    const allDogs = await getAllDogs();  // Obtenemos la lista completa de perros.

    // Filtramos los perros de la API que coincidan con el parámetro.
    const filteredDogsApi = allDogs.filter((dog) => dog.name.toLowerCase().startsWith(name.toLowerCase()));

    // Buscamos en la DB los perros que coincidan con el parámetro.
    const filteredDogsDb = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: `${name}%`
            }
        },
        include: {  // Pero que también incluyan los temperamentos.
            model: Temperament,
            attributes: ['name'],  // Solamente los nombres.
            through: {
                attributes: []
            }
        }
    });

    // Formateamos los perros de la DB para que coincidan en estructura a los de la API.
    const formattedDogsDb = filteredDogsDb.map(dog => ({
        id: dog.id,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        image: dog.image,
        temperaments: dog.Temperaments.map(t => t.name),
        from: 'DB'
    }));

    return [ ...filteredDogsApi, ...formattedDogsDb ];
};

module.exports = {
    getByName
}