import React, { useContext, useEffect, useState } from "react";
import getPhoto from "../../apiRequest/getPhoto";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FoodContext } from "../context/foodContext";

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
    <div>
      <div className="grid grid-cols-1 gap-4 m-2 md:grid-cols-5 md:m-1 md:mt-0 justify-center bg-slate-200">
        {favorites.map((item, index) => {
          return (
            <div className="grid content-between justify-center items-center rounded-md border-2 border-blue-200" key={index}>
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
                {imagesLoaded && (
                  <img
                    className="h-96 object-cover w-screen md:h-40"
                    src={
                      images[index].photos[0]
                        ? images[index].photos[0].src.large
                        : "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2021%2F07%2F13%2FUltimate-Veggie-Burgers-FT-Recipe-0821.jpg"
                    }
                    alt={images[index].photos.alt}
                  />
                )}
                <h5 className="text-center font-serif font-bold" id="itemHeading">{item.title}</h5>
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
                onClick={(event) => {
                  // event.currentTarget.style.color = "black";
                  handleFavoriteButton("remove", item);
                }}
              ></FavoriteBorderIcon>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
