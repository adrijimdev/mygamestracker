const axios = require('axios');
require('dotenv').config();

const apiUrl = `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`;

exports.handler = async (event) => {
  const { path } = event;
  try {
    console.log("Iniciando función de Netlify...");

    console.log(`Petición recibida: ${path}`);

    const response = await axios.get(apiUrl);

    console.log(`Respuesta obtenida: ${JSON.stringify(response.data.results)}`);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.results),
    };
  } catch (error) {
    console.error("Error en la función:", error.message);
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
