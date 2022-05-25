import React, { useContext, useEffect, useState } from "react";
import getPhoto from "../../apiRequest/getPhoto";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FoodContext } from "../context/foodContext";
import { Box } from "@material-ui/core";
import { CircularProgress } from "@mui/material";

const Favorites = () => {
  const { favorites, setItem, handleFavoriteButton } = useContext(FoodContext);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const getImageData = async () => {
      const promises = Array.from({ length: favorites.length }).map((_, i) => {
        return getPhoto(favorites[i].title);
      });
      Promise.all(promises)
        .then((imageData) => {
          if (imageData[0].error === "Rate limit exceeded") {
            setImagesLoaded(false);
          } else {
            setImages(imageData);
            setImagesLoaded(true);
          }
        })
        .catch(() => {
          setImagesLoaded(false);
        });
    };
    getImageData();
  }, [favorites]);

  return (
    <div className="grid grid-cols-1 gap-4 h-screen overflow-scroll md:grid-cols-5 md:mt-0 justify-center bg-slate-200">
      {imagesLoaded && favorites.length ? (
        favorites.map((item, index) => {
          return (
            <div
              className="grid items-stretch rounded-md border-2 border-blue-200"
              key={index}
            >
              <Link
                to={`${item.title}`}
                onClick={() => {
                  if (imagesLoaded) {
                    const newItem = {
                      ...item,
                      image: images[index].photos[0].src.large,
                    };
                    setItem(newItem);
                  } else {
                    setItem(item);
                  }
                }}
              >
                {
                  <img
                    className="w-screen object-cover rounded-md md:h-40 lg:h-96"
                    src={
                      images[index].photos[0]
                        ? images[index].photos[0].src.large
                        : "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2021%2F07%2F13%2FUltimate-Veggie-Burgers-FT-Recipe-0821.jpg"
                    }
                    alt={images[index].photos.alt}
                  />
                }
                <h5
                  className="text-center font-serif font-bold"
                  id="itemHeading"
                >
                  {item.title}
                </h5>
                <p className="text-xs text-center font-light">{`${item.ingredients.substring(
                  0,
                  100
                )}...`}</p>
                <div className="resultItemNav"></div>
              </Link>
              <FavoriteBorderIcon
                className="m-auto"
                sx={{
                  color: "red",
                }}
                id="favoriteButton1"
                onClick={() => {
                  handleFavoriteButton("remove", item);
                }}
              ></FavoriteBorderIcon>
            </div>
          );
        })
      ) : favorites.length ?(
        <Box
          sx={{
            height: '100vh',
            width: '100vw'
          }}>
          <CircularProgress
            sx={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: "auto",
              position: "absolute",
            }}
          />
        </Box>
      ):
        <p className='left-0 right-0 top-0 bottom-0 m-auto relative font-bold'>Make some hearts <b className='text-[rgb(255,47,47)]'>red</b></p>
      }
    </div>
  );
};

export default Favorites;
