import "./footer.css";
import React from "react";

const Footer = () => {
  return (
    <div className="footerDiv">
      <h4>Made with ♥️ by Kartikey</h4>
      <h4>Here is a list of all the resources</h4>
      <div>
        <ul>
          <li>
            All the pictures are from&nbsp;
            <a href="https://www.pexels.com">pexels.</a>
          </li>
          <li>
            All the recipes are from&nbsp;
            <a href="https://rapidapi.com/apininjas/api/recipe-by-api-ninjas/">
              recipe-by-api-ninjas&nbsp;
            </a>
            from RapidAPI.
          </li>
          <li>
            All the nutritions information is by&nbsp;
            <a href="https://rapidapi.com/calorieninjas/api/calorieninjas/">
              CaloriNinja&nbsp;
            </a>
            from RapidAPI.
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
