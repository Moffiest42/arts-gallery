
import React, { useState } from 'react';
import arrowIcon from '/assets/icons/arrow_icon.svg';

const Card = ({ painting }) => {
  const [imgError, setImgError] = useState(false);

  const getLocalImage = (id) => {

 
  };
  

  const imageUrl = imgError ? getLocalImage(painting.id) : painting.imageUrl;
  
  return (
    <article className="card">
      <div className="card__img-wrap">
        <img 
          src={imageUrl}
          alt={painting.alt || painting.title}
          className="card__img"
          loading="lazy"
          onError={() => {
            console.log(`load: ${painting.title}`);
            setImgError(true);
          }}
        />
      </div>
      <div className="card__body">
        <div className="card__default">
          <span className="card__accent-line"></span>
          <div className="card__meta">
            <h2 className="card__title">{painting.title}</h2>
            <span className="card__year">{painting.year}</span>
          </div>
          <span className="card__arrow" aria-hidden="true">
            <img src={arrowIcon} alt="" />
          </span>
        </div>
        <div className="card__hover-meta">
          <span className="card__accent-line"></span>
          <div className="card__details">
            <span className="card__artist">{painting.artist}</span>
            <span className="card__location">{painting.location}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;