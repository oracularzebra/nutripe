import React, { useEffect, useState } from "react";
import getPhoto from "../../apiRequest/getPhoto";
import "./favorite.css";
import { Link } from "react-router-dom";

const Favorites = ({ items, setItem }) => {
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const getImageData = async () => {
      const promises = Array.from({ length: items.length }).map((_, i) => {
        return getPhoto(items[i].title);
      });
      Promise.all(promises)
        .then((imageData) => {
          console.log(imageData);
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
  }, [items]);

  return (
    <div>
      <div className="favoriteDiv">
        {items.map((item, index) => {
          return (
            <div key={index}>
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
                    src={
                      images[index].photos[0]
                        ? images[index].photos[0].src.large
                        : "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2021%2F07%2F13%2FUltimate-Veggie-Burgers-FT-Recipe-0821.jpg"
                    }
                    alt={images[index].photos.alt}
                  />
                )}
                <h5 id="itemHeading">{item.title}</h5>
                <p id="ingredientsOverview">{`${item.ingredients.substring(
                  0,
                  100
                )}...`}</p>
                <div className="resultItemNav"></div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
