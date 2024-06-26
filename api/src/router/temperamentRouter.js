const { Router } = require('express');
const { getTemperaments } = require('../controller/getTemperament');

const temperamentRouter = Router();

temperamentRouter.get('/', async (request, response) => {
    try {
        const allTemperaments = await getTemperaments()  // Ejecutamos el controlador de temperamentos.

        if (allTemperaments) {
            return response.status(200).json(allTemperaments);
        } else {
            return res.status(404).json('No Temperaments found');
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = temperamentRouter;