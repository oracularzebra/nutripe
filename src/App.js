import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router";
import Result from "./components/searchResult/Result";
import Item from "./components/food/food";
import Main from "./components/homePage/home";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
<<<<<<< HEAD
          element={<Main isLoading={isLoading} setIsLoading={setIsLoading} />}
=======
          element={
            <Main isLoading={isLoading} setIsLoading={setIsLoading}/>
          }
>>>>>>> 8d9875f153f0a66453a84ffe04edcdd125841b4f
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
