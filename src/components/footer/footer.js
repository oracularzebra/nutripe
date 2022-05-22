import React from "react";

const Footer = () => {
  return (
    <div className="grid justify-center bg-slate-200 bg-blend-hue text-center">
      <h4>Designed and developed with ♥️ by Kartikey</h4>
      <div>
        <ul>
          <li>
            All the pictures are from&nbsp;
            <a className="font-bold" href="https://www.pexels.com">pexels.</a>
          </li>
          <li>
            All the recipes are from&nbsp;
            <a className="font-bold" href="https://rapidapi.com/apininjas/api/recipe-by-api-ninjas/">
              recipe-by-api-ninjas&nbsp;
            </a>
            from RapidAPI.
          </li>
          <li>
            All the nutritions information is by&nbsp;
            <a className="font-bold" href="https://rapidapi.com/calorieninjas/api/calorieninjas/">
              CaloriNinja&nbsp;
            </a>
            from RapidAPI.
          </li>
          <li>
            All the icons are from&nbsp;
            <a className="font-bold" href="https://icons8.com/">icons8</a>
          </li>
          <li>
            ImageList component of <a className="font-bold" href="https://mui.com/">Material UI</a> is used in home and food page.
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
