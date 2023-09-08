import React from "react";
import Navigation from "../components/Nav";
import NewsInfo from "../components/newsInfo";
import styles from "./Resources.module.scss";
import BarChart from "../components/BarChart";
import CardNews from "../components/CardNews";
import PolarChart from "../components/PolarChart";
import Fatality from "../components/fatality";
import { useEffect, useState, useRef } from "react";
import Testimonial from "../components/Testimonial";
const sampleMovie = [
  {
    title: "Vic Roads",
    posterImage: "/vicroad2.png",
    description: "Victorian government cycle guidelines",
    ref: "https://www.vicroads.vic.gov.au/traffic-and-road-use/cycling",
  },
  {
    title: "Victoria Legal Aid",
    posterImage: "/victorialegalaid2.png",
    description: "For legal problems",
    ref: "https://www.legalaid.vic.gov.au/cycling-and-skating",
  },
  {
    title: "Public Transport",
    posterImage: "/ptv.png",
    description: "Bike and public transport",
    ref: "https://www.ptv.vic.gov.au/more/travelling-on-the-network/bikes-on-public-transport/",
  },
  {
    title: "Victoria Police",
    posterImage: "/vic_police.png",
    description: "Bike theft",
    ref: "https://www.police.vic.gov.au/bike-theft",
  },
];

const Resources = () => {
  return (
    <div className={styles["resources-main"]}>
      <Navigation />
      <div className={styles["resource-container"]}>
        <img
          className={styles["resource-img"]}
          src="/resources.png"
          alt="Resources"
        />
      </div>
      <section>
        <p className={styles["paragraph-resource"]} data-aos="zoom-in-up">
          Safety Rules at a Glance
        </p>
        <CardNews />
      </section>

      <div>
        <p className={styles["paragraph-resource"]} data-aos="zoom-in-up">
          Watch & Learn: Safety Tutorials
        </p>
        <div className={styles["video-container"]}>
          <iframe
            className={styles["videoResources"]}
            src="https://www.youtube.com/embed/a60UqyoX04w"
            title="YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <iframe
            className={styles["videoResources"]}
            src="https://www.youtube.com/embed/PT1-mDlVyaI?si=bWmQwOn7SbpQJEzE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <iframe
            className={styles["videoResources"]}
            src="https://www.youtube.com/embed/280oreUTr6o?si=a9fMUQ9hXgR0vV7c"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <p className={styles["paragraph-resource"]} data-aos="zoom-in-up">
        Latest in Bicycle Safety News
      </p>
      <Testimonial />
      <section>
        <p className={styles["paragraph-resource"]} data-aos="zoom-in-up">
          By the Numbers: Why Safety Matters
        </p>
        <div>
          {/* <video className={styles["video"]} controls autoPlay muted>
              <source src="../Videos/intro.mp4" type="video/mp4" />
            </video> */}
        </div>

        <div className={styles["chart-container2"]}>
          <div
            className={styles["importantInfo"]}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
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

          <div
            className={styles["importantInfo"]}
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
          >
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

      <section className={styles["newsSection"]}>
        <p className={styles["paragraph-resource"]} data-aos="zoom-in-up">
          Essential Resources for Every Cyclist
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
