const { Dog, Temperament } = require('../DB_connection');

const getDbDogs = async () => {  // Función que devuelve una lista de los perros de la DB.

    const dataBaseDog = await Dog.findAll({
        include: {  // Incluye información adicional del modelo de temperamentos.
            model: Temperament,
            attributes: ['name'],  // Solo me quedo con los nombre de los temperamentos.
            through: {  // Se especifica que es la tabla intermedia.
                attributes: []  // Para que no incluya ninguna propiedad de esa tabla.
            }
        }
    });

    return dataBaseDog.map((dog) => {  // Mapea los perros encontrados y crea un objeto por cada uno.
        return {
            id: dog.id,
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            image: dog.image,
            temperaments: dog.temperament ? dog.Temperament.map((t) => t.name) : [],
            from: 'DATA BASE'  // Le creo un campo para saber de donde proviene.
        }
    });
};

module.exports = {
    getDbDogs
}