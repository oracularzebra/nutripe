import React, { useContext } from "react";
import { useRef } from "react";
import {Link} from 'react-router-dom'
import { FoodContext } from "../context/foodContext";
import image from '../../Nutripe Logo.jpeg';

const Header = () => {
  const ref = useRef(null);
  const { handleSearchSubmit, value, setValue } = useContext(FoodContext);
  return (
    <div className="flex justify-between items-center rounded-bl-md rounded-br-md bg-[#c8bbaa]">
      <Link to="/">
        <img src={image} className='h-20 w-30' />
      </Link>
      <form onSubmit={handleSearchSubmit}>
        <label>
          <input
            className="p-2 text-[rgb(2,2,2)] w-40 mr-0 md:mr-14 focus:outline-none rounded-md"
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
