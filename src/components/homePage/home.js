import React from "react";
import { useNavigate } from "react-router";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="grid justify-around items-stretch content-center">
      <div className="selectedImages"></div>
      <div className="flex justify-between gap-2">
        <button className="p-3 bg-blue-500" id="favouritesButton" onClick={()=>navigate('favorites')}>Favourites</button>
        <button className="p-3 bg-blue-500" id="likedButton">Liked</button>
        <button className="p-3 bg-blue-500" id="watchLaterButton">Watch Later</button>
      </div>
    </div>
  );
};
export default Main;
