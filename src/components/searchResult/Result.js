import { useEffect, useState } from "react";
import { useParams } from "react-router";
import getRecipes from "../../apiRequest/getRecipes";
import "./Result.css";
import { useNavigate } from "react-router";
import getPhoto from "../../apiRequest/getPhoto";
import { Link } from "react-router-dom";

const Result = ({ setItem }) => {
  const [recipe, setRecipe] = useState({});
  const [err, setErr] = useState(false);
  const { name } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getRecipeData = async () => {
      setIsLoading(true);
      try {
        await getRecipes(name).then(async (data) => {
          setRecipe(data);
          console.log(data);
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
              setPhotos(imageData);
              setImagesLoaded(true);
            })
            .catch(() => {
              setImagesLoaded(false);
            });
        });
      } catch (err) {
        setErr(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getRecipeData();
  }, [name]);

  return (
    <div className="resultDiv">
      {!isLoading &&
        imagesLoaded &&
        !err &&
        recipe.map((item, index) => {
          return (
            <Link to={`/item/${index}`} 
              key={index}
              onClick={()=>{
                const newItem = {...item, image:photos[index].photos[0].src.large2x}
                setItem(newItem);
              }}
              >
              <img
                src={photos[index].photos[0].src.large}
                alt={photos[index].photos.alt}
              />
              {item.title}
            </Link>
          );
        })}
    </div>
  );
};
export default Result;
