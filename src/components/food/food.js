import React from "react";
import SugarIcon from "../../icons/icons8-sugar-48.png";
import CarbohydratesIcon from "../../icons/icons8-carbohydrates-50.png";
import CholestrolIcon from "../../icons/icons8-cholesterol-64.png";
import FatIcon from "../../icons/icons8-fat-51.png";
import FatSaturatedIcon from "../../icons/icons8-fat-man-50.png";
import FibreIcon from "../../icons/icons8-fiber-50.png";
import PotassiumIcon from "../../icons/icons8-potassium-64.png";
import ProteinIcon from "../../icons/icons8-protein-50.png";
import SodiumIcon from "../../icons/icons8-sodium-50.png";
import CalorieIcon from "../../icons/icons8-calories-50.png";
import { ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { Box } from "@material-ui/core";
import { LinearProgress } from "@mui/material";
import "../food/food.css";
import { useParams } from "react-router";
import { CircularProgress } from "@mui/material";
import useGetFoodItem_Pictures_items from "./getFood_Pictures_NutriInfo";

const Item = () => {
  const { id, name } = useParams();

  const [
    item,
    pictures,
    ingredientList,
    nutrientsObj,
    gotFood,
    picturesLoaded,
    nutrientInfoLoaded,
  ] = useGetFoodItem_Pictures_items(name, id);

  return (
    <div
      style={{
        // backgroundImage: `url(${image2})import image1 from '../../background Images/food.jpeg';`,
        // backgroundImage: "url('https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')",
        // backgroundImage: "url('https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')",
        backgroundImage:
          "url('https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="grid bg-repeat-round h-screen overflow-scroll"
    >
      {gotFood && picturesLoaded ? (
        <div>
          <h2 className="text-center font-bold text-2xl m-4" id="foodTitle">
            {item.title}
          </h2>

          <ImageList
            sx={{
              margin: "auto",
              width: "80vw",
              height: "40vh",
              borderRadius: "5px",
              boxShadow: "4px 4px 4px grey",
            }}
            variant="quilted"
            cols={4}
            rowHeight={121}
          >
            {pictures.photos.map((item) => (
              <ImageListItem key={item.id} cols={2} rows={3}>
                <img
                  className="flex-row flex-wrap overflow-hidden"
                  src={item.src.portrait}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>

          <div>
            <ul className="flex flex-wrap justify-center items-center gap-1">
              <li className="flex flex-col items-center content-center">
                <img src={SugarIcon} alt="sugar" />
                <h6 className="text-sm font-light">
                  Sugar{" "}
                  {nutrientsObj.sugar_g ? (
                    nutrientsObj.sugar_g.toFixed(2) + "g"
                  ) : !nutrientInfoLoaded ? (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  ) : (
                    "Info not available"
                  )}
                </h6>
              </li>
              <li className="flex flex-col items-center content-center">
                <img src={CarbohydratesIcon} alt="carbohydrates" />
                <h6 className="text-sm font-light">
                  Carbohydrates{" "}
                  {nutrientsObj.carbohydrates_total_g ? (
                    nutrientsObj.carbohydrates_total_g.toFixed(2) + "g"
                  ) : !nutrientInfoLoaded ? (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  ) : (
                    "Info not available"
                  )}
                </h6>
              </li>
              <li className="flex flex-col items-center content-center">
                <img src={CalorieIcon} alt="calories" />
                <h6 className="text-sm font-light">
                  Calories{" "}
                  {nutrientsObj.calories ? (
                    nutrientsObj.calories.toFixed(2) + "g"
                  ) : !nutrientInfoLoaded ? (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  ) : (
                    "Info not available"
                  )}
                </h6>
              </li>
              <li className="flex flex-col items-center content-center">
                <img src={ProteinIcon} alt="protein" />
                <h6 className="text-sm font-light">
                  Protein{" "}
                  {nutrientsObj.protein_g ? (
                    nutrientsObj.protein_g.toFixed(2) + "g"
                  ) : !nutrientInfoLoaded ? (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  ) : (
                    "Info not available"
                  )}
                </h6>
              </li>
              <li className="flex flex-col items-center content-center">
                <img src={FatIcon} alt="total fat" />
                <h6 className="text-sm font-light">
                  Total fat{" "}
                  {nutrientsObj.fat_total_g ? (
                    nutrientsObj.fat_total_g.toFixed(2) + "g"
                  ) : !nutrientInfoLoaded ? (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  ) : (
                    "Info not available"
                  )}
                </h6>
              </li>
              <li className="flex flex-col items-center content-center">
                <img src={FatSaturatedIcon} alt="saturated fat" />
                <h6 className="text-sm font-light">
                  Saturated fat{" "}
                  {nutrientsObj.fat_saturated_g ? (
                    nutrientsObj.fat_saturated_g.toFixed(2) + "g"
                  ) : !nutrientInfoLoaded ? (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  ) : (
                    "Info not available"
                  )}
                </h6>
              </li>
              <li className="flex flex-col items-center content-center">
                <img src={PotassiumIcon} alt="potassium" />
                <h6 className="text-sm font-light">
                  Potassium{" "}
                  {nutrientsObj.potassium_mg ? (
                    nutrientsObj.potassium_mg.toFixed(2) + "g"
                  ) : !nutrientInfoLoaded ? (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  ) : (
                    "Info not available"
                  )}
                </h6>
              </li>
              <li className="flex flex-col items-center content-center">
                <img src={SodiumIcon} alt="Sodium" />
                <h6 className="text-sm font-light">
                  Sodium{" "}
                  {nutrientsObj.sodium_mg ? (
                    nutrientsObj.sodium_mg.toFixed(2) + "g"
                  ) : !nutrientInfoLoaded ? (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  ) : (
                    "Info not available"
                  )}
                </h6>
              </li>
              <li className="flex flex-col items-center content-center">
                <img src={FibreIcon} alt="fiber" />
                <h6 className="text-sm font-light">
                  Fiber{" "}
                  {nutrientsObj.fiber_g ? (
                    nutrientsObj.fiber_g.toFixed(2) + "g"
                  ) : !nutrientInfoLoaded ? (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  ) : (
                    "Info not available"
                  )}
                </h6>{" "}
              </li>
              <li className="flex flex-col items-center content-center">
                <img src={CholestrolIcon} alt="Cholesterol" />
                <h6 className="text-sm font-light">
                  Cholesterol{" "}
                  {nutrientsObj.cholesterol_mg ? (
                    nutrientsObj.cholesterol_mg.toFixed(2) + "g"
                  ) : !nutrientInfoLoaded ? (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  ) : (
                    "Info not available"
                  )}
                </h6>
              </li>
            </ul>
          </div>
          <div className="grid">
            <h4 className="text-xl font-bold m-auto" id="servingInfo">
              {item.servings}
            </h4>
            <h3
              className="text-xl font-normal m-auto"
              id="ingredientsRequiredHeading"
            >
              Ingredients Required
            </h3>
            <ul className="grid" id="ingredientList">
              {ingredientList.map((ingredient, index) => (
                <li
                  className="flex justify-between"
                  id="ingredientListItem"
                  key={index}
                >
                  <input
                    id="ingredientListItemCheckbox"
                    className="scale-150 mr-2 order-1"
                    type="checkbox"
                  />
                  <p className="font-mono" id="ingredientListItemText">
                    {ingredient.replace(";", " - ").replace(",", " - ")}
                  </p>
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-2xl font-mono text-center">
              Instructions
            </h3>
            <span className="font-light">{item.instructions}</span>
          </div>
          <br />
        </div>
      ) : (
        <Box>
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
      )}
    </div>
  );
};
export default Item;
