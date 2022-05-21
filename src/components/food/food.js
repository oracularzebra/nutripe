import { useContext, useEffect, useState } from "react";
import getNutri from "../../apiRequest/getNutritionalInfo";
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
import { FoodContext } from "../context/foodContext";
import foodBacngroundImage from '../../background Images/WhatsApp Image 2022-05-20 at 11.30.12 PM.jpeg'

const Item = () => {

  const { item } = useContext(FoodContext);
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
    <div style={{
      backgroundImage: 'url()'
    }} className="grid  bg-[#3d3c78] bg-gradient-to-t i">
      <h2 className="text-center font-bold text-2xl m-4" id="foodTitle">{showItem.title}</h2>
      {showItem.image ? (
        <img
          id="foodImage"
          className="rounded-3xl md:w-[900px] m-auto md:m-auto object-cover md:h-[500px] left-0 top-0 shadow-md shadow-pink-200"
          src={showItem.image}
          alt={"An elephant should appear here"}
        />
      ) : (
        <h2 className="photosNotLoaded">pexel's limit exceeded😑</h2>
      )}
      <div>
        <ul className="flex flex-wrap justify-center items-center gap-1">
          <li className="flex flex-col items-center content-center">
            <img src={SugarIcon} alt="sugar" />
            <h6 className="text-sm font-light">Sugar {nutrientsObj.sugar_g.toFixed(2)}g</h6>
          </li>
          <li className="flex flex-col items-center content-center">
            <img src={CarbohydratesIcon} alt="carbohydrates" />
            <h6 className="text-sm font-light">
              Carbohydrates {nutrientsObj.carbohydrates_total_g.toFixed(2)}g
            </h6>
          </li>
          <li className="flex flex-col items-center content-center">
            <img src={CalorieIcon} alt="calories" />
            <h6 className="text-sm font-light">Calories {nutrientsObj.calories.toFixed(2)}kcal</h6>
          </li>
          <li className="flex flex-col items-center content-center">
            <img src={ProteinIcon} alt="protein" />
            <h6 className="text-sm font-light">Protein {nutrientsObj.protein_g.toFixed(2)}g</h6>
          </li>
          <li className="flex flex-col items-center content-center">
            <img src={FatIcon} alt="total fat" />
            <h6 className="text-sm font-light">Total fat {nutrientsObj.fat_total_g.toFixed(2)}g</h6>
          </li>
          <li className="flex flex-col items-center content-center">
            <img src={FatSaturatedIcon} alt="saturated fat" />
            <h6 className="text-sm font-light">Saturated fat {nutrientsObj.fat_saturated_g.toFixed(2)}g</h6>
          </li>
          <li className="flex flex-col items-center content-center">
            <img src={PotassiumIcon} alt="potassium" />
            <h6 className="text-sm font-light">Potassium {nutrientsObj.potassium_mg.toFixed(2)}mg</h6>
          </li>
          <li className="flex flex-col items-center content-center">
            <img src={SodiumIcon} alt="Sodium" />
            <h6 className="text-sm font-light">Sodium {nutrientsObj.sodium_mg.toFixed(2)}mg</h6>
          </li>
          <li className="flex flex-col items-center content-center">
            <img src={FibreIcon} alt="fiber" />
            <h6 className="text-sm font-light">Fiber {nutrientsObj.fiber_g.toFixed(2)}g</h6>{" "}
          </li>
          <li className="flex flex-col items-center content-center">
            <img src={CholestrolIcon} alt="Cholesterol" />
            <h6 className="text-sm font-light">Cholesterol {nutrientsObj.cholesterol_mg.toFixed(2)}mg</h6>
          </li>
        </ul>
      </div>
      <div className="grid">
        <h4 className="text-xl font-bold m-auto" id="servingInfo">{showItem.servings}</h4>
        <h3 className="text-xl font-normal m-auto" id="ingredientsRequiredHeading">Ingredients Required</h3>
        <ul className="grid" id="ingredientList">
          {ingredientList.map((ingredient, index) => (
            <li className="flex justify-between" id="ingredientListItem" key={index}>
              <input className="scale-150 order-1" type="checkbox" />
              <p className="font-mono" id="ingredientListItem">
                {ingredient.replace(";", " - ").replace(",", " - ")}
              </p>
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
