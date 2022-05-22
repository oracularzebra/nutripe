import { createContext } from "react";
import React, { useReducer } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const FoodContext = createContext({});

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [item, setItem] = useState({});

  //favorites is a stateful value, and dispatch is a function for updating the value.
  //favoriteReducer performs all the crud operations.
  function favoriteReducer(favorites, action) {
    switch (action.type) {
      case "add": {
        localStorage.setItem(
          "favorites",
          JSON.stringify([...favorites, action.item])
        );
        return [...favorites, action.item];
      }
      case "remove": {
        console.log("removed");
        favorites = favorites.filter(
          (item) => item.title !== action.item.title
        );
        console.log(favorites);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        return favorites;
      }
    }
  }

  const [favorites, dispatch] = useReducer(
    favoriteReducer,
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const handleFavoriteButton = (type, item) => {
    dispatch({
      item: item,
      type: type,
    });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`search/${value}`);
    setValue("");
  };

  return (
    <FoodContext.Provider
      value={{
        item,
        setItem,
        handleFavoriteButton,
        handleSearchSubmit,
        value,
        setValue,
        favorites,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
export default ContextProvider;
