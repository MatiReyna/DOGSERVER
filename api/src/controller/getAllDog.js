const { Dog, Temperament } = require('../DB_connection');
const { getApiDogs } = require('./getApiDog');
const { getDbDogs } = require('./getDbDog');

const getAllDogs = async () => {

    // Ejecutamos los controladores para que nos traigan los perros.
    const [ apiDogs, dbDogs ] = await Promise.all([ getApiDogs(), getDbDogs() ]);

    // Unimos las dos fuentes de datos para que sea una sola lista.
    const allDogs = dbDogs.concat(apiDogs);

    const dogWithTemperaments = await Promise.all(
        allDogs.map(async (dog) => {
            if (dog.from === 'DB') {
                const dbDog = await Dog.findByPk(dog.id, { include: Temperament })  // Si el perro es de la base de datos, obtenemos los temperamentos.
                return {
                    ...dog,
                    temperaments: dbDog.Temperaments.map((t) => t.name)
                }
            } else {
                return dog;
            }
        })
    );

    return dogWithTemperaments;  // Se retornan todos los perros.
};

module.exports = {
    getAllDogs
}