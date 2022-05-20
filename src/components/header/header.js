import React, { useContext } from "react";
import { useRef } from "react";
import {Link} from 'react-router-dom'
import { FoodContext } from "../context/foodContext";

const Header = () => {
  const ref = useRef(null);
  const { handleSearchSubmit, value, setValue } = useContext(FoodContext);
  return (
    <div className="flex justify-between items-center w-screen h-fit rounded-bl-md rounded-br-md p-3 bg-blue-300">
      <Link to="/">
        <h2 className="text-2xl">Nutripe</h2>
      </Link>
      <form onSubmit={handleSearchSubmit}>
        <label>
          <input
            className="p-2 w-52 mr-2 rounded-md"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={ref}
            type="text"
            placeholder="Enter the food item"
          />
        </label>
      </form>
    </div>
  );
};
export default Header;
