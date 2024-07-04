const axios = require('axios');
const { Temperament } = require('../DB_connection');
require('dotenv').config();
const { API_KEY } = process.env;

const getTemperaments = async () => {  // Función que obtiene los temperamentos de la API y los guarda en la DB.

    const temperamentDataBase = await Temperament.findAll();  // Busca todos los temperamentos de la DB.

    if (temperamentDataBase.length) {  // Si, cargo todos los temperamentos, que lo retorne.
        return temperamentDataBase
    } else {
        // Extraemos toda la información de la API.
        const response = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`));
        const temperamentApi = response.data;

        let auxiliar = temperamentApi.flatMap((dog) => (dog.temperament || '').split(', ').map((temp) => temp.trim())).filter(Boolean);

        const temperamentOrder = [...new Set(auxiliar)].sort();

        // Creamos los temperamentos en la DB.
        const createdTemperament = await Temperament.bulkCreate(
            temperamentOrder.map(temp => ({ name: temp }))
        );
        return createdTemperament.map((temp) => temp.name);
    }
};

module.exports = {
    getTemperaments
}