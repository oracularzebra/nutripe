import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import getPhoto from "../../apiRequest/getPhoto";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Main = () => {
  const [pictures, setPictures] = useState([]);
  const [randomFood, setRandomFood] = useState("");

  useEffect(() => {
    const randomFood = [
      "samosa",
      "momo",
      "juice",
      "biryani",
      "shake",
      "ice cream",
      "pizza",
    ];
    const selectedRandomFood =
      randomFood[Math.floor(Math.random() * randomFood.length)];
    setRandomFood(selectedRandomFood);
    getPhoto(selectedRandomFood, window.innerWidth > 768 ? 4 : 3)
      .then((imageData) => {
        return imageData.photos;
      })
      .then((imageArray) => {
        console.log(imageArray);
        setPictures(imageArray);
      });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="grid flex-wrap bg-black justify-around content-around w-auto h-screen row-start-2 row-end-3">
      <ImageList cols={window.innerWidth > 768 ? 2 : 1}>
        {pictures.map((picture) => (
          <ImageListItem
            onClick={() => {
              navigate(`/search/${randomFood}`);
            }}
            key={picture.id}
          >
            <img src={`${picture.src.landscape}`} alt={picture.alt} />
          </ImageListItem>
        ))}
      </ImageList>
      <div className="flex justify-around items-center gap-2">
        <button
          className="p-3 bg-blue-500 rounded-md"
          id="favouritesButton"
          onClick={() => navigate("favorites")}
        >
          Favourites
        </button>
        <button className="p-3 bg-blue-500 rounded-md" id="likedButton">
          Liked
        </button>
        <button className="p-3 bg-blue-500 rounded-md" id="watchLaterButton">
          Watch Later
        </button>
      </div>
    </div>
  );
};
export default Main;
