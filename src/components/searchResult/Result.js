import { useEffect, useState } from "react";
import { useParams } from "react-router";
import React from "react";
import getRecipes from "../../apiRequest/getRecipes";
import "./Result.css";
import getPhoto from "../../apiRequest/getPhoto";
import { Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Result = ({ setItem }) => {
  const [recipe, setRecipe] = useState({});
  const { name } = useParams();
  const [recipeLoaded, setRecipeLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getRecipeData = async () => {
      try {
        setRecipeLoaded(false);
        await getRecipes(name).then(async (data) => {
          setRecipe(data);
          console.log(data);
          setRecipeLoaded(true);
          const PromiseToGetImage = (query) => {
            return getPhoto(query);
          };
          setImagesLoaded(false);
          const promises = Array.from({ length: data.length }).map((_, i) => {
            return PromiseToGetImage(data[i].title);
          });
          Promise.all(promises)
            .then((imageData) => {
              console.log(imageData);
              if (imageData[0].error === "Rate limit exceeded") {
                setImagesLoaded(false);
              } else {
                setPhotos(imageData);
                setImagesLoaded(true);
              }
            })
            .catch(() => {
              setImagesLoaded(false);
            });
        });
      } catch (err) {
        console.log(err);
      }
    };
    getRecipeData();
  }, [name]);

  return (
    <div className="resultDiv">
      {recipeLoaded ? (
        recipe.map((item, index) => {
          return (
            <div key={index}>
              <Link
                to={`/${name}/${index}`}
                onClick={() => {
                  if (imagesLoaded) {
                    const newItem = {
                      ...item,
                      image: photos[index].photos[0].src.large,
                    };
                    setItem(newItem);
                  } else {
                    setItem(item);
                  }
                }}
              >
                {imagesLoaded && (
                  <img
                    src={photos[index].photos[0].src.large}
                    alt={photos[index].photos.alt}
                  />
                )}
                <h5 id="itemHeading">{item.title}</h5>
                <p id="ingredientsOverview">{`${item.ingredients.substring(
                  0,
                  100
                )}...`}</p>
              </Link>
              <div className='resultItemNav'>
                <ThumbUpIcon
                  sx={{
                    color: "#5e95f2",
                  }}
                  onClick={() => {
                    console.log("clicked");
                  }}
                ></ThumbUpIcon>
                <FavoriteBorderIcon></FavoriteBorderIcon>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Result;
