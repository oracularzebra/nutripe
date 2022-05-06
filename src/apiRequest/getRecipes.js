import axios from "axios";

const getRecipes = (food) => {
  const options = {
    method: "GET",
    url: "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe",
    params: { query: `${food}` },
    headers: {
      "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
      "X-RapidAPI-Key": "f6d53b64f0msh477f1931b2416ebp1c34e9jsnde49544a7ea4",
    },
  };
  return axios
    .request(options)
    .then((response) => response.data)
    .catch((reject) => console.log(reject));
};
export default getRecipes;
