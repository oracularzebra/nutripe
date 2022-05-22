import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import getPhoto from "../../apiRequest/getPhoto";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const Main = ({setFoodItem}) => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    getPhoto("food", window.innerWidth > 768 ? 4 : 3)
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
          <ImageListItem onClick={()=>{
            console.log('clicked');
          }} key={picture.id}>
            <img src={`${picture.src.landscape}`} alt={picture.alt} />
            <ImageListItemBar
              title={picture.alt}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${picture.alt}`}
                >
                </IconButton>
              }
            />
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
