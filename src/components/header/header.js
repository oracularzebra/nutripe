import React, { useContext } from "react";
import { useRef } from "react";
import {Link} from 'react-router-dom'
import { FoodContext } from "../context/foodContext";
import image from '../../Nutripe Logo.jpeg';

const Header = () => {
  const ref = useRef(null);
  const { handleSearchSubmit, value, setValue } = useContext(FoodContext);
  return (
    <div className="order-1 flex justify-between items-center bg-[#c8bbaa]">
      <Link to="/" className="h-[min-content] m-0 relative">
        <img src={image} className='w-[160px] h-[160/3px] bg-cover m-0 object-cover left-0 top-0 absolte '/>
      </Link>
      <form onSubmit={handleSearchSubmit}>
        <label>
          <input
            className="p-2 text-[rgb(2,2,2)] w-40 mr-0 md:mr-14 focus:outline-none rounded-md"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={ref}FoodContext
            type="text"
            placeholder="Enter the food item"
          />
        </label>
      </form>
    </div>
  );
};
export default Header;
