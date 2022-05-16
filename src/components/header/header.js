import "./header.css";
import React from "react";
import { useRef } from "react";
import {Link} from 'react-router-dom'

const Header = ({ handleSubmit, value, setValue }) => {
  const ref = useRef(null);

  return (
    <div className="headerDiv">
      <Link to="/" className="linkToHome">
        <h2>Nutripe</h2>
      </Link>
      <form onSubmit={handleSubmit}>
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
