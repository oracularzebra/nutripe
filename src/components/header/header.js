import "./header.css";
import React from "react";
import { useRef } from "react";
// import SearchIcon from '@mui/icons-material/Search';

const Header = ({ handleSubmit, value, setValue }) => {
  const ref = useRef(null);

  return (
    <div className="headerDiv">
      <h2>Nutripe</h2>
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
          {/* <SearchIcon id="searchButton" onClick={() => ref.current.focus()}/> */}
        </label>
      </form>
    </div>
  );
};
export default Header;
