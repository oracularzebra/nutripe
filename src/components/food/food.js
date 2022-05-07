import { useParams } from "react-router";
import "./food.css";

const Item = ({ item }) => {

  const { name ,id } = useParams();

  console.log(item);

  return (
    <div className="food">
        {item.image && <img id="foodImage" src={item.image} />}
        <h2 id="foodTitle">{item.title}</h2>
        <div>
          <br />
          <h4>{item.servings}</h4>
          <h3 id="ingredientsRequiredHeading">Ingredients Required</h3>
          <ol id="listOfIngredients">{item.ingredients}</ol>
          <span>{item.instructions}</span>
        </div>
      <br />
    </div>
  );
};
export default Item;
