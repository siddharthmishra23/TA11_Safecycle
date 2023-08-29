import React from "react";
import Navigation from "../components/Nav";
import NewsInfo from "../components/newsInfo";
import styles from "./Resources.module.scss";
import BarChart from "../components/BarChart";
import CardNews from "../components/CardNews";
import PolarChart from "../components/PolarChart";
import Fatality from "../components/fatality";

const sampleMovie = [
  {
    title: "Vic Roads",
    posterImage: "/vicroads2.jpeg",
    description: "Victorian government cycle guidelines",
    ref: "https://www.vicroads.vic.gov.au/traffic-and-road-use/cycling",
  },
  {
    title: "Victoria Legal Aid",
    posterImage: "/victorialegalaid2.png",
    description: "For legal problems",
    ref: "https://www.legalaid.vic.gov.au/cycling-and-skating",
  },
];

const Resources = () => {
  return (
    <div>
      <Navigation />
      <div className={styles["resources-container"]}></div>
      <section>
        <p className={styles["paragraph-resource"]}>Safety Statistics</p>

        <div className={styles["chart-container2"]}>
          <div className={styles["importantInfo"]}>
            <h4>Accident Timing Analysis</h4>
            The graph highlights the timeframes during which accidents
            frequently occur: daytime, dawn, or nighttime. Recognizing these
            patterns can help drivers and pedestrians to be particularly
            cautious during high-risk times. It's essential to adapt your
            driving behavior according to the visibility and conditions of each
            time frame.
          </div>

          <div className={styles["chartSummary"]}>
            <PolarChart />
            <p style={{ color: "grey", fontSize: "10px" }}>
              Source:{" "}
              <a
                style={{ color: "grey", textDecoration: "underline" }}
                href="https://www.crimestatistics.vic.gov.au/crime-statistics/latest-crime-data-by-area"
              >
                Latest crime data by area
              </a>
            </p>
          </div>
        </div>
        <div className={styles["chart-container1"]}>
          <div className={styles["chartSummarybox"]}>
            <BarChart />
            <p style={{ color: "grey", fontSize: "10px" }}>
              Source:{" "}
              <a
                style={{ color: "grey", textDecoration: "underline" }}
                href="https://vicroadsopendata-vicroadsmaps.opendata.arcgis.com/datasets/vicroadsmaps::road-crashes-for-five-years-victoria/explore?location=-36.523327%2C145.286240%2C14.53"
              >
                Road Crashes 5 Years for Victoria
              </a>
            </p>
          </div>

          <div className={styles["importantInfo"]}>
            <h4>Accidents Overview</h4>
            This chart provides insights into the number of accidents that
            occurred on each day of the week. Analyzing this data can help city
            planners and residents to be more vigilant and take precautions on
            specific days. Always remember to drive safely and follow all
            traffic rules.
          </div>
        </div>
        <div className={styles["severity-container"]}>
          <Fatality />
        </div>
      </section>
      <section>
        <p className={styles["paragraph-resource"]}>Related News and updates</p>
        <CardNews />
      </section>

      <section>
        <p className={styles["paragraph-resource"]}>
          Links to Important Websites
        </p>
        <div className={styles["wrapper"]}>
          {sampleMovie.map((movie, index) => (
            <NewsInfo key={index} news={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resources;
