import React from "react";
import Navigation from "../components/Nav";
import NewsInfo from "../components/newsInfo";
import styles from "./Resources.module.scss"; // Assuming you have a CSS file named 'Resources.css' in the same folder

const sampleMovie = [
  {
    title: "Vic Roads",
    posterImage: "./public/vicroads.jpeg",
    description:
      "The new Department of Transport and Planning gives us a singular, integrated focus on tackling the big issues – from improving buses in growing suburbs to making it easier to walk and cycle places and embrace new technology. ",
    ref: "https://www.vicroads.vic.gov.au/traffic-and-road-use/cycling",
  },
  {
    title: "Victoria Legal Aid",
    posterImage: "./public/victorialegalaid.png",
    description:
      "We help people with their legal problems. We focus on protecting the rights of Victorians and representing those who need it the most.",
    ref: "https://www.legalaid.vic.gov.au/cycling-and-skating",
  },
];

const Resources = () => {
  return (
    <div>
      <Navigation />
      <div className={styles["resources-container"]}>
        <div className={styles["wrapper"]}>
          {sampleMovie.map((movie, index) => (
            <a href={movie.ref} key={index} className="resource-link">
              <NewsInfo news={movie} />
            </a>
          ))}
          <div className={styles["box"]}>
            <div className={styles["content"]}>
              <h2 className={styles["resources-title"]}>Safety comes first!</h2>
              <p>
                Cycling Find the information you need about cycling routes in
                Victoria, places to ride, network planning, infrastructure and
                more.
              </p>
            </div>
          </div>
        </div>
        <div className={styles["chartSummary"]}>chartjs</div>
      </div>
    </div>
  );
};

export default Resources;
