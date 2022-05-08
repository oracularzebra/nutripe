import axios from "axios";

//It will take an array of items and gives the nutritions present.
const getNutri = async (query) => {

  const options = {
    method: "GET",
    url: "https://calorieninjas.p.rapidapi.com/v1/nutrition",
    params: { query: `${query}`},
    headers: {
      "X-RapidAPI-Host": "calorieninjas.p.rapidapi.com",
      "X-RapidAPI-Key": "f6d53b64f0msh477f1931b2416ebp1c34e9jsnde49544a7ea4",
    },
  };
  return axios.request(options)
  .then((response) => response.data);
};

export default getNutri;
