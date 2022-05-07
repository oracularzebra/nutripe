import { useParams } from "react-router";
import "./food.css";

const Item = ({ item }) => {
  const { name, id } = useParams();

  //Now we want to have the ingredients and the insturctions in a list.

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
          {item.ingredients.split("|").map((ingredient, index) => (
            <li key={index}>{ingredient.replace(';', ' - ').replace(',', ' - ')}</li>
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
