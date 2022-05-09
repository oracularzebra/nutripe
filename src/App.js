import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router";
import Result from "./components/searchResult/Result";
import Item from "./components/food/food";
import Main from "./components/homePage/home";

function App() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [item, setItem] = useState({});

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
        <Route
          path="/"
          element={<Main/>}
        ></Route>
        <Route
          path="/search/:name"
          element={<Result searchQuery={value} setItem={setItem} />}
        ></Route>
        <Route path="/:name/:id" element={<Item item={item} />} />
        <Route path="*"></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
