import axios from "axios";

const getRecipesFromApiNinjas = async (food) => {
  const options = {
    method: "GET",
    url: "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe",
    params: { query: `${food}` },
    headers: {
      "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
      "X-RapidAPI-Key": "f6d53b64f0msh477f1931b2416ebp1c34e9jsnde49544a7ea4",
    },
  };
  try {
    const response = await axios
      .request(options);
    return response.data;
  } catch (reject) {
    return console.log(reject);
  }
};
const getRecipesFromRecipesApi = async (food) => {
  const options = { 
    method: "GET",
    url: "https://recipesapi2.p.rapidapi.com/recipes/tomato%20soup",
    params: { maxRecipes: "10" },
    headers: {
      "X-RapidAPI-Host": "recipesapi2.p.rapidapi.com",
      "X-RapidAPI-Key": "f6d53b64f0msh477f1931b2416ebp1c34e9jsnde49544a7ea4",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
export default getRecipesFromRecipesApi || getRecipesFromApiNinjas;
