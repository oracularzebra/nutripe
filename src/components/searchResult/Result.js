import { useEffect, useState } from "react";
import { useParams } from "react-router";
import getRecipes from "../../apiRequest/getRecipes";
import "./Result.css";
import { useNavigate } from "react-router";
import getPhoto from "../../apiRequest/getPhoto";

const Result = ({ setItem }) => {
  const navigate = useNavigate();
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
              setImagesLoaded(true)
            })
            .catch(() => {
              setImagesLoaded(false);
            })
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
      {!isLoading && !err && recipe.map((item, index) => {
        return (
          <div key={index}>
            {imagesLoaded &&<img src={photos[index].photos[0].src.large} alt="" />}
            {item.title}
          </div>
        );
      })}
    </div>
  );
};
export default Result;
