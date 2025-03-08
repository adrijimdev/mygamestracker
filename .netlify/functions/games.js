const axios = require("axios");
require("dotenv").config();

const apiUrl = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`;

exports.handler = async (event) => {
  let genre = "";
  let searchString ="";

  try {
    console.log("Iniciando función de Netlify...");

    console.log(`Petición recibida: ${event.path}`);
    const page = event.queryStringParameters.page || 1;
    let url = `${apiUrl}&page=${page}&page_size=15`;

    if (event.queryStringParameters.genre) {
      genre = event.queryStringParameters.genre;
      url += `&genres=${genre}`;
    }

    if (event.queryStringParameters.search) {
      searchString = event.queryStringParameters.search;
      url += `&search=${searchString}`;
    }

    const response = await axios.get(url);
    // console.log(`Respuesta obtenida: ${JSON.stringify(response.data.results)}`);

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
