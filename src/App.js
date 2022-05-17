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
import ContextProvider from "./components/context/foodContext";

function App() {

  return (
    <div className="App">
      <ContextProvider>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/search/:name" element={<Result />}></Route>
          <Route path="/:name/:id" element={<Item/>} />
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/favorites/:name" element={<Item/>}></Route>
          <Route path="*"></Route>
        </Routes>
      </ContextProvider>

      <Footer></Footer>
    </div>
  );
}

export default App;
