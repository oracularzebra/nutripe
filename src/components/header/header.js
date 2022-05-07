import "./header.css";
import { useRef } from "react";

const Header = ({ handleSubmit, value, setValue }) => {
  const ref = useRef(null);

  return (
    <div>
      <header className="permHeader">
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
            <button
              id="searchButton"
              onClick={() => ref.current.focus()}
              type="submit"
            >
              Search
            </button>
          </label>
        </form>
      </header>
    </div>
  );
};
export default Header;
