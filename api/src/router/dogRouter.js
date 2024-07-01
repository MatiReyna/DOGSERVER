const { Router } = require('express');
const { getAllDogs } = require('../controller/getAllDog');
const { getTemperaments } = require('../controller/getTemperament');
const { getById } = require('../controller/getById');

const dogRouter = Router();

dogRouter.get('/', async (request, response) => {
    try {
        await getTemperaments();
        
        const allDogs = await getAllDogs();
        return response.status(200).json(allDogs);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

dogRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const dogFind = await getById(id);
        return response.status(200).json(dogFind);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
});

module.exports = dogRouter;