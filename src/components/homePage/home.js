import React from "react";
import { useNavigate } from "react-router";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="grid justify-baseline row-start-2 row-end-3">
      <img src="https://img.icons8.com/color/48/000000/yogurt.png" className="absolute m-auto left-0 right-0 top-0 bottom-0" />
      <div className="flex justify-between gap-2">
        <button
          className="p-3 bg-blue-500"
          id="favouritesButton"
          onClick={() => navigate("favorites")}
        >
          Favourites
        </button>
        <button className="p-3 bg-blue-500" id="likedButton">
          Liked
        </button>
        <button className="p-3 bg-blue-500" id="watchLaterButton">
          Watch Later
        </button>
      </div>
    </div>
  );
};
export default Main;
