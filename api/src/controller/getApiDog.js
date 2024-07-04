const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getApiDogs = async () => {  // Función que devuelve una lista de los perros de la API.

    const responseApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)  // Petición a la API.

    const dogsApi = responseApi.data.map((dog) => {  // Con la respuesta de la petición, por cada perro crea un objeto.
        return {
            id: dog.id,
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
            image: dog.image.url,
            temperaments: dog.temperament ? dog.temperament.split(',').map((t) => t.trim()) : [],  // De ser NULL se le asigna un array vacio.
            from: 'API'  // Le creo un campo para saber de donde proviene.
        }
    });
    return dogsApi;
};

module.exports = {
    getApiDogs
}

// TODO: Si hay temperamentos, entonces los separa con una ',' y elimina los espacion en balnco. 