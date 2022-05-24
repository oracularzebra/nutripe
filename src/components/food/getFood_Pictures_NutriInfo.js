const useGetFoodItem_Pictures_items = (name, id) => {

    const [item, setItem] = useState();
    const [pictures, setPictures] = useState();
    const [ingredientList, setIngredientList] = useState([]);
    const [nutriObj, setNutriObj] = useState({
      sugar_g: 0,
      fiber_g: 0,
      serving_size_g: 0,
      sodium_mg: 0,
      potassium_mg: 0,
      fat_saturated_g: 0,
      fat_total_g: 0,
      calories: 0,
      cholesterol_mg: 0,
      protein_g: 0,
      carbohydrates_total_g: 0,
    });

    useEffect(() => {

      getRecipesFromApiNinjas(name).then((itemArr) => {
        const item = itemArr[id];
        setItem(item);

        const ingredients = item.ingredients.split("|");
        setIngredientList(ingredients);

        const promises = Array.from({ length: ingredients.length }).map(
          (_, index) => {
            return getNutri(ingredients[index]);
          }
        );
        Promise.all(promises).then((list) => {
          let tempNutriObj = Object.create(itemsObj);

          for (let item of list) {
            console.log(item);
            for (let items of item.items) {
              tempNutriObj = {
                sugar_g: items.sugar_g + tempNutriObj.sugar_g,
                fiber_g: items.fiber_g + tempNutriObj.fiber_g,
                serving_size_g:
                  items.serving_size_g + tempNutriObj.serving_size_g,
                sodium_mg: items.sodium_mg + tempNutriObj.sodium_mg,
                potassium_mg:
                  items.potassium_mg + tempNutriObj.potassium_mg,
                fat_saturated_g:
                  items.fat_saturated_g + tempNutriObj.fat_saturated_g,
                fat_total_g: items.fat_total_g + tempNutriObj.fat_total_g,
                calories: items.calories + tempNutriObj.calories,
                cholesterol_mg:
                  items.cholesterol_mg + tempNutriObj.cholesterol_mg,
                protein_g: items.protein_g + tempNutriObj.protein_g,
                carbohydrates_total_g:
                  items.carbohydrates_total_g +
                  tempNutriObj.carbohydrates_total_g,
              };
            }
          };
          console.log(tempNutriObj);
          setNutriObj(tempNutriObj);
        });
        getPhoto(itemArr[id], 6).then((images) => {
          setPictures(images);
        });

        return itemArr[id];
      });
    }, []);
    return [item, pictures, ingredientList, nutriObj];
  };

  export default getFoodItemAndGetPictures;