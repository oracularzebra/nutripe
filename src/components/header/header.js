import "./header.css";
import React, { useContext } from "react";
import { useRef } from "react";
import {Link} from 'react-router-dom'
import { FoodContext } from "../context/foodContext";

const Header = () => {
  const ref = useRef(null);
  const { handleSearchSubmit, value, setValue } = useContext(FoodContext);
  return (
    <div className="headerDiv">
      <Link to="/" className="linkToHome">
        <h2>Nutripe</h2>
      </Link>
      <form onSubmit={handleSearchSubmit}>
        <label>
          <input
            className="searchInput"
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
