import { useParams } from "react-router";
import './food.css'

const Item = ({item})=>{

    const {id} = useParams();
    console.log(item);

    return (
        <div className="food">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <h3>Ingredients Required</h3>
        </div>
    )
}
export default Item;