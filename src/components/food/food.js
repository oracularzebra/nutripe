import { useEffect, useState } from "react";
import { useParams } from "react-router";
import getNutri from "../../apiRequest/getNutritionalInfo";
import "./food.css";
import React from "react";
import SugarIcon from "../../icons/icons8-sugar-48.png";
import CarbohydratesIcon from "../../icons/icons8-carbohydrates-50.png";
import CholestrolIcon from "../../icons/icons8-cholesterol-64.png";
import FatIcon from "../../icons/icons8-fat-51.png";
import FatSaturatedIcon from "../../icons/icons8-fat-man-50.png";
import FibreIcon from "../../icons/icons8-fiber-50.png";
import PotassiumIcon from "../../icons/icons8-potassium-64.png";
import ProteinIcon from "../../icons/icons8-protein-50.png";
import SodiumIcon from "../../icons/icons8-sodium-50.png";
import CalorieIcon from "../../icons/icons8-calories-50.png";

const Item = ({ item }) => {
  const { name, id } = useParams();
  const showItem =
    Object.keys(item).length === 0
      ? JSON.parse(localStorage.getItem("item"))
      : item;
  const ingredientList = showItem.ingredients.split("|");
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
          return (tempNutrient = {
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
          });
        } catch (err) {
          return;
        }
      });
      setNutrientsObj(tempNutrient);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(item).length) {
      localStorage.setItem("item", JSON.stringify(item));
    }
  }, [item]);

  return (
    <div className="food">
      <h2 id="foodTitle">{showItem.title}</h2>
      {showItem.image ? (
        <img
          id="foodImage"
          src={showItem.image}
          alt={"An elephant should appear here"}
        />
      ) : (
        <h2 className="photosNotLoaded">The limit of pexels exceeded😑</h2>
      )}
      <div className="nutrientsDiv">
        <ul>
          <li>
            <img src={SugarIcon} alt="sugar" />
            <h6>Sugar {nutrientsObj.sugar_g.toFixed(2)}g</h6>
          </li>
          <li>
            <img src={CarbohydratesIcon} alt="carbohydrates" />
            <h6>
              Carbohydrates {nutrientsObj.carbohydrates_total_g.toFixed(2)}g
            </h6>
          </li>
          <li>
            <img src={CalorieIcon} alt="calories" />
            <h6>Calories {nutrientsObj.calories.toFixed(2)}kcal</h6>
          </li>
          <li>
            <img src={ProteinIcon} alt="protein" />
            <h6>Protein {nutrientsObj.protein_g.toFixed(2)}g</h6>
          </li>
          <li>
            <img src={FatIcon} alt="total fat" />
            <h6>Total fat {nutrientsObj.fat_total_g.toFixed(2)}g</h6>
          </li>
          <li>
            <img src={FatSaturatedIcon} alt="saturated fat" />
            <h6>Saturated fat {nutrientsObj.fat_saturated_g.toFixed(2)}g</h6>
          </li>
          <li>
            <img src={PotassiumIcon} alt="potassium" />
            <h6>Potassium {nutrientsObj.potassium_mg.toFixed(2)}mg</h6>
          </li>
          <li>
            <img src={SodiumIcon} alt="Sodium" />
            <h6>Sodium {nutrientsObj.sodium_mg.toFixed(2)}mg</h6>
          </li>
          <li>
            <img src={FibreIcon} alt="fiber" />
            <h6>Fiber {nutrientsObj.fiber_g.toFixed(2)}g</h6>{" "}
          </li>
          <li>
            <img src={CholestrolIcon} alt="Cholesterol" />
            <h6>Cholesterol {nutrientsObj.cholesterol_mg.toFixed(2)}mg</h6>
          </li>
        </ul>
      </div>
      <div className="servingIngredientAndInstructionDiv">
        <h4 id="servingInfo">{showItem.servings}</h4>
        <h3 id="ingredientsRequiredHeading">Ingredients Required</h3>
        <ul id="ingredientList">
          {ingredientList.map((ingredient, index) => (
            <li id="ingredientListItem" key={index}>
              <p>{ingredient.replace(";", " - ").replace(",", " - ")}</p>
              <input type="checkbox"/>
            </li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <span>{showItem.instructions}</span>
      </div>
      <br />
    </div>
  );
};
export default Item;
