const { Router } = require('express');
const { getTemperaments } = require('../controller/getTemperament');

const temperamentRouter = Router();

temperamentRouter.get('/', async (request, response) => {
    try {
        const allTemperaments = await getTemperaments()  // Ejecutamos el controlador de temperamentos.

        if (allTemperaments) {
            return response.status(200).json(allTemperaments);
        } else {
            return response.status(404).json({ error: 'No Temperaments found' });
        }
    } catch (error) {
        return response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = temperamentRouter;