import { useEffect, useState } from "react";
import { useParams } from "react-router";
import getRecipes from "../../apiRequest/getRecipes";
import "./Result.css";
import getPhoto from "../../apiRequest/getPhoto";
import { Link } from "react-router-dom";


const Result = ({ setItem }) => {

  const [recipe, setRecipe] = useState({});
  const { name } = useParams();
  const [recipeLoaded, setRecipeLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {

    const getRecipeData = async () => {
      try {
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
              if(imageData[0].error.length){
                setImagesLoaded(false);
              }else{
                setPhotos(imageData);
                setImagesLoaded(true);
              }
            })
            .catch(() => {
              imagesLoaded(false);
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
      {recipeLoaded &&
        recipe.map((item, index) => {
          return (
            <Link to={`/${name}/${index}`} 
              key={index}
              onClick={()=>{
                if(imagesLoaded){
                  const newItem = {...item, image:photos[index].photos[0].src.large}
                  setItem(newItem);
                }
                else{
                  setItem(item);
                }
              }}
              >
              {imagesLoaded && <img
                src={photos[index].photos[0].src.large}
                alt={photos[index].photos.alt}
              />}
              {item.title}
            </Link>
          );
        })}
    </div>
  );
};
export default Result;
