import { Wallpaper } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import getPhoto from '../../apiRequest/getPhoto';

const Main = () => {

  const [wallPaper, setWallPaper] = useState('');

  useEffect(() => {
    getPhoto('food', 20).then((imageData)=>{
      return imageData.photos;
    }).then((imageArray)=>{
      const selectedWallPaper = imageArray[Math.floor(Math.random()*19)].src.landscape;
      setWallPaper(selectedWallPaper);
    })
  }, []);

  const navigate = useNavigate();
  return (
    <div
      style={
        {
          backgroundImage: `url('${wallPaper}')`,
          backgroundSize:'cover'
        }
      }
      className="grid bg-black justify-baseline w-auto h-screen row-start-2 row-end-3"
    >
      {/* <img src="https://img.icons8.com/color/48/000000/yogurt.png" className="absolute m-auto left-0 right-0 top-0 bottom-0" /> */}
      <div className="grid justify-start items-center gap-2">
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
