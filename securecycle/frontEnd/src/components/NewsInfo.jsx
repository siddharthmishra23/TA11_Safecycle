import React from "react";
import "animate.css/animate.min.css";
import "./NewsInfo.css";

const NewsInfo = ({ news }) => {
  return (
    <div className="card animate__animated animate__fadeIn ">
      <div className="poster animate__animated animate__fadeInDownBig">
        <img src={news.posterImage} alt={news.title} />
      </div>
      <div className="details animate__animated animate__fadeInUpBig">
        <h1>{news.title}</h1>
        <p className="desc">{news.description}</p>
      </div>
    </div>
  );
};

export default NewsInfo;
