import "./header.css";
import { useRef } from "react";

const Header = ({ handleSubmit, value, setValue }) => {
  const ref = useRef(null);

  return (
    <div>
      <header>
        <h2>Eat Healthy</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              required
              value={value}
              onChange={(e)=>setValue(e.target.value)}
              ref={ref}
              type="text"
              placeholder="Enter the food item"
            />
            <button onClick={() => ref.current.focus()} type="submit">
              Search
            </button>
          </label>
        </form>
      </header>
    </div>
  );
};
export default Header;
