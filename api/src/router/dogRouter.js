const { Router } = require('express');
const { getAllDogs } = require('../controller/getAllDog');
const { getTemperaments } = require('../controller/getTemperament');
const { getById } = require('../controller/getById');
const { getByName } = require('../controller/getByName');
const { postDog } = require('../controller/postDog');

const dogRouter = Router();

dogRouter.get('/', async (request, response) => {
    try {
        const { name } = request.query;

        await getTemperaments();  // Lama a la función para asegurarse que esten disponibles.

        if (name) {
            const dogName = await getByName(name);
            return response.status(200).json(dogName);
        } else {
            const allDogs = await getAllDogs();
            return response.status(200).json(allDogs);
        }
    } catch (error) {
        console.error('Error fetching dogs:', error);
        return response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

dogRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const dogFind = await getById(id);
        return response.status(200).json(dogFind);
    } catch (error) {
        console.error('Error fetching dog by ID:', error);
        return response.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
});

dogRouter.post('/', async (request, response) => {
    try {
        const { name, height, weight, life_span, image, temperaments } = request.body;

        if (!name || !height || !weight || !life_span || !image) {
            return response.status(400).json({ error: 'Missing required fields' });
        } else {
            const newDog = await postDog(name, height, weight, life_span, image, temperaments);
            return response.status(201).json(newDog);
        }
    } catch (error) {
        console.error('Error creating new dog:', error);
        return response.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = dogRouter;