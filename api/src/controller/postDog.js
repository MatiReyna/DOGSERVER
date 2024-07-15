const { Dog, Temperament } = require('../DB_connection');
const { Op } = require('sequelize');  // Para realizar comparaciones en las consultas.

const postDog = async (name, height, weight, life_span, image, temperaments) => {  // Función que crea un perro.

    const dogFind = await Dog.findOne({  // Busca en la DB si ya existe un perro con ese nombre.
        where: { name }
    });

    if (dogFind) {
        return `This dog ${name} already exists`
    } else {
        const newDog = await Dog.create({  // Creamos el perro en la base de datos.
            name,
            height,
            weight,
            life_span,
            image,
            from: 'DB'
        });

        let temperamentsFind = [];
        if (temperaments && temperaments.length > 0) {
            temperamentsFind = await Temperament.findAll({
                where: {
                    name: {
                        [Op.in]: temperaments
                    }
                }
            });
            // Asociamos los temperamentos al perro creado.
            await newDog.setTemperaments(temperamentsFind)
        }

        const dogWithTemperaments = await Dog.findByPk(newDog.id, { include: Temperament });
        const temperamentsName = dogWithTemperaments.Temperaments.map((t) => t.name);

        return {
            id: dogWithTemperaments.id,
            name: dogWithTemperaments.name,
            height: dogWithTemperaments.height,
            weight: dogWithTemperaments.weight,
            life_span: dogWithTemperaments.life_span,
            image: dogWithTemperaments.image,
            temperaments: temperamentsName,
            from: dogWithTemperaments.from
        }
    }
};

module.exports = {
    postDog
}