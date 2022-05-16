import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import React, { useReducer } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router";
import Result from "./components/searchResult/Result";
import Item from "./components/food/food";
import Main from "./components/homePage/home";
import Favorites from "./components/favorites/favorites";

function App() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [item, setItem] = useState({});

  //favorites is a stateful value, and dispatch is a function for updating the value.
  //favoriteReducer performs all the crud operations.
  function favoriteReducer(favorites, action) {
    switch (action.type) {
      case "add": {
        localStorage.setItem('favorites', JSON.stringify([...favorites, action.item]));
        return [...favorites, action.item];
      }
      case "remove": {
        console.log("removed");
        break;
      }
    }
  }

  const [favorites, dispatch] = useReducer(
    favoriteReducer,
    JSON.parse(localStorage.getItem("favorites") || [])
  );

  //we wanto to add the item in favorite when we click the heart button in result page.
  const handleFavoriteButton = (item) => {
    dispatch({
      type: "add",
      item: item,
    });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`search/${value}`);
    setValue("");
  };

  return (
    <div className="App">
      <Header
        handleSubmit={handleSearchSubmit}
        value={value}
        setValue={setValue}
      ></Header>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route
          path="/search/:name"
          element={
            <Result
              searchQuery={value}
              setItem={setItem}
              handleFavorite={handleFavoriteButton}
            />
          }
        ></Route>
        <Route
          path="/:name/:id"
          element={<Item item={item} setItem={setItem} />}
        />
        <Route
          path="/favorites"
          element={<Favorites items={favorites} />}
        ></Route>
        <Route path="*"></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
