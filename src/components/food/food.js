import { useEffect, useState } from "react";
import { useParams } from "react-router";
import getNutri from "../../apiRequest/getNutritionalInfo";
import "./food.css";

const Item = ({ item }) => {
  const { name, id } = useParams();
  const ingredientList = item.ingredients.split("|");
  const [properties, setProperties] = useState({
    sugar_g: 0,
    fiber_g: 0,
    serving_size_g: 0,
    sodium_mg: 0,
    name: '',
    potassium_mg: 0,
    fat_saturated_g: 0,
    fat_total_g: 0,
    calories: 0,
    cholesterol_mg: 0,
    protein_g: 0,
    carbohydrates_total_g: 0,
  });

  useEffect(() => {
    const promises = Array.from({ length: 10 }).map((_, index) => {
      return getNutri(ingredientList[index]);
    });
    Promise.all(promises).then((list) => {
      list.map((item) => {
        const values = Object.values(item);
        const nutrients = values[0][0];
        console.log(nutrients);
        try{

        }catch(err){

        }
        console.log(properties);
      });
    });
  }, []);

  return (
    <div className="food">
      {item.image && <img id="foodImage" src={item.image} />}
      <h2 id="foodTitle">{item.title}</h2>
      <div>
        <br />
        <h4>{item.servings}</h4>
        <h3 id="ingredientsRequiredHeading">Ingredients Required</h3>
        <ul id="listOfIngredients">
          {ingredientList.map((ingredient, index) => (
            <li key={index}>
              {ingredient.replace(";", " - ").replace(",", " - ")}
            </li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <span>{item.instructions}</span>
      </div>
      <br />
    </div>
  );
};
export default Item;
