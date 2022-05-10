import { useEffect, useState } from "react";
import { useParams } from "react-router";
import getNutri from "../../apiRequest/getNutritionalInfo";
import "./food.css";
import React from "react";

const Item = ({ item }) => {
  const { name, id } = useParams();
  const ingredientList = item.ingredients.split("|");
  const [nutrientsObj, setNutrientsObj] = useState({
    sugar_g: 0,
    fiber_g: 0,
    serving_size_g: 0,
    sodium_mg: 0,
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
      let tempNutrient = Object.create(nutrientsObj);
      list.map((item) => {
        const values = Object.values(item);
        const nutrients = values[0][0];
        console.log(nutrients);
        try {
          return tempNutrient = {
            sugar_g: nutrients.sugar_g + tempNutrient.sugar_g,
            fiber_g: nutrients.fiber_g + tempNutrient.fiber_g,
            serving_size_g:
              nutrients.serving_size_g + tempNutrient.serving_size_g,
            sodium_mg: nutrients.sodium_mg + tempNutrient.sodium_mg,
            potassium_mg: nutrients.potassium_mg + tempNutrient.potassium_mg,
            fat_saturated_g:
              nutrients.fat_saturated_g + tempNutrient.fat_saturated_g,
            fat_total_g: nutrients.fat_total_g + tempNutrient.fat_total_g,
            calories: nutrients.calories + tempNutrient.calories,
            cholesterol_mg:
              nutrients.cholesterol_mg + tempNutrient.cholesterol_mg,
            protein_g: nutrients.protein_g + tempNutrient.protein_g,
            carbohydrates_total_g:
              nutrients.carbohydrates_total_g +
              tempNutrient.carbohydrates_total_g,
          };
        } catch (err) {
          return 
        }
      });
      setNutrientsObj(tempNutrient);
    });
  }, []);

  return (
    <div className="food">
      {item.image && <img id="foodImage" src={item.image} alt={'An elephant should appear here'}/>}
      <h2 id="foodTitle">{item.title}</h2>
      <div>
        <h3>Nutrient Facts</h3>
        <ol>
          { Object.entries(nutrientsObj).map((item, index) => {
            return <li key={index}>{`${item[0]}=${item[1]}`}</li>;
          })}
        </ol>
      </div>
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
