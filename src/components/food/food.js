import { useEffect, useState } from "react";
import { useParams } from "react-router";
import getNutri from "../../apiRequest/getNutritionalInfo";
import "./food.css";

const Item = ({ item }) => {
  const { name, id } = useParams();
  const [nutritions, setNutritions] = useState([]);

  const ingredientList = item.ingredients.split("|");
  useEffect(() => {
    const promises = Array.from({ length: 10 }).map((_, index) => {
      return getNutri(ingredientList[index]);
    });
    Promise.all(promises).then((list) => 
      setNutritions(list)
    );
  }, []);

  console.log(item);

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
        {console.log(nutritions)}
      </div>
      <br />
    </div>
  );
};
export default Item;
