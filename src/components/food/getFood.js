//This function works only when we don't select item from the result page.
import getRecipesFromApiNinjas from "../../apiRequest/getRecipes";

//This will fetch the item from the result page and return it.
const getFood = async( name, id ) => {

   const foodItem = await getRecipesFromApiNinjas(name);
    console.log(foodItem)
    return foodItem[parseInt(id)];
};
export default getFood;
