import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import getPhoto from "../../apiRequest/getPhoto";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Main = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    getPhoto("food", 9)
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
    <div
      className="grid flex-wrap bg-black justify-around content-around w-auto h-screen row-start-2 row-end-3"
    >
      <ImageList className="flex flex-wrap" cols={3}>
        {pictures.map((picture) => (
          <ImageListItem key={picture.id}>
            <img
              src={`${picture.src.medium}`}
              alt={picture.alt}
              // loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div className="flex justify-around items-center gap-2">
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
