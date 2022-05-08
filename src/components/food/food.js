import { useEffect, useState } from "react";
import { useParams } from "react-router";
import getNutri from "../../apiRequest/getNutritionalInfo";
import "./food.css";

const Item = ({ item }) => {
  const { name, id } = useParams();
  const ingredientList = item.ingredients.split("|");
  const [nutrientsLoaded, setNutrientsLoaded] = useState(false);
  const [properties, setProperties] = useState({
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
      list.map((item) => {
        const values = Object.values(item);
        const nutrients = values[0][0];
        console.log(nutrients);
        try {
          const {
            sugar_g,
            fiber_g,
            serving_size_g,
            sodium_mg,
            potassium_mg,
            fat_saturated_g,
            fat_total_g,
            calories,
            cholesterol_mg,
            protein_g,
            carbohydrates_total_g,
          } = nutrients;
          setProperties({
            sugar_g: sugar_g + properties.sugar_g,
            fiber_g: fiber_g + properties.fiber_g,
            serving_size_g: serving_size_g + properties.serving_size_g,
            sodium_mg: sodium_mg + properties.sodium_mg,
            potassium_mg: potassium_mg + properties.potassium_mg,
            fat_saturated_g: fat_saturated_g + properties.fat_saturated_g,
            fat_total_g: fat_total_g + properties.fat_total_g,
            calories: calories + properties.calories,
            cholesterol_mg: cholesterol_mg + properties.cholesterol_mg,
            protein_g: protein_g + properties.protein_g,
            carbohydrates_total_g:
              carbohydrates_total_g + properties.carbohydrates_total_g,
          });
        } catch (err) {
          console.log(err);
        }
      });
    });
  }, []);

  return (
    <div className="food">
      {item.image && <img id="foodImage" src={item.image} />}
      <h2 id="foodTitle">{item.title}</h2>
      <div>
          <h3>Nutrient Facts</h3>
          {
            Object.entries(properties).map((item, index) => {
              return <li key={index}>{`${item[0]}=${item[1]}`}</li>
            })
          }
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
