import React from "react";
import "./TrailInfo.css"; // import your CSS file

function TrailInfo({ details }) {
  return (
    <div className="trail-main-container">
      <h2 className="trail-title">Explore the Beauty of {details.title}!</h2>
      <p className="trail-location">Located: {details.located}</p>
      <div className="trail-info-container">
        <div className="trail-info-text">
          <strong>Journey Stretch:</strong>
          <p>{details.length}</p>
          <strong>Discover the Trail:</strong>
          <p>{details.description}</p>
          <strong>Hidden Gems Nearby:</strong>
          <ul className="nearby-attractions">
            {details.nearby.map((attraction) => (
              <li key={attraction}>{attraction}</li>
            ))}
          </ul>
        </div>
        <div className="trail-image-container">
          <img
            src={details.img}
            alt={`${details.title} trail`}
            style={{ borderRadius: "3rem" }}
          />
        </div>
      </div>
    </div>
  );
}

export default TrailInfo;
