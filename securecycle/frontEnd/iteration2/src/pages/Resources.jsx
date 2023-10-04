import React from "react";
import Navigation from "../components/Nav";
import NewsInfo from "../components/newsInfo";
import styles from "./Resources.module.scss";
import BarChart from "../components/BarChart";
import MapBarhartHour from "../components/MapBarchartHour";
import CardNews from "../components/CardNews";
import PolarChart from "../components/PolarChart";
import Fatality from "../components/fatality";
import Testimonial from "../components/Testimonial";
import MapBarchartHour from "../components/MapBarchartHour";
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
      {/* <div className={styles["resource-container"]}>
        <img
          className={styles["resource-img"]}
          src="/resources.png"
          alt="Resources"
        />
      </div> */}
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
            <h4>Increasing cyclists in Victoria</h4>
            In recent years, Victoria has witnessed a surge in its cycling
            population. Data from 2009 to 2017 indicates a marked increase in
            the number of cyclists commuting into Melbourne city for work or
            school, especially between the hours of 7 to 10 am. This trend
            emphasizes the significance of providing safe routes and
            infrastructure for these commuters, given the inherent
            vulnerabilities faced by cyclists in traffic.
          </div>

          <div className={styles["chartSummary"]}>
            <PolarChart />
            <p style={{ color: "grey", fontSize: "10px" }}>
              Source:{" "}
              <a
                style={{ color: "grey", textDecoration: "underline" }}
                href="https://www.crimestatistics.vic.gov.au/crime-statistics/latest-crime-data-by-area"
              >
                City of Melbourne
              </a>
            </p>
          </div>
        </div>
        <div className={styles["chart-container1"]}>
          <div
            className={styles["importantInfo"]}
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
          >
            <h4>Top 5 accident vehicle in Victoria</h4>
            The bar chart illustrates how the frequency of accidents involving
            different types of vehicles has changed over the last two decades.
            Notably, bikes have emerged as one of the top five vehicles most
            frequently involved in accidents in Victoria.
          </div>
          <div className={styles["chartSummarybox"]}>
            <BarChart />
            <p style={{ color: "grey", fontSize: "10px" }}>
              Source:{" "}
              <a
                style={{ color: "grey", textDecoration: "underline" }}
                href="https://vicroadsopendata-vicroadsmaps.opendata.arcgis.com/datasets/vicroadsmaps::road-crashes-for-five-years-victoria/explore?location=-36.523327%2C145.286240%2C14.53"
              >
                Road Crashes Victoria
              </a>
            </p>
          </div>
        </div>

        <div className={styles["severity-container"]}>
          <div></div>
          <div
            className={styles["importantInfo"]}
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
          >
            <h4>High chance to get serious injury</h4>
            Based on our analysis, there is a significant likelihood of
            experiencing a severe injury, with a 34% probability, and a 1%
            chance of it resulting in a fatality. Only 64% of cases are expected
            to result in minor injuries or no injuries at all.
          </div>
        </div>
        <Fatality />
        <div className={styles["severity-container"]}>
          <div></div>
          <div
            className={styles["importantInfo"]}
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
          >
            <h4>Stay safe with our insights</h4>
            This chart provides insights into the number of accidents in the
            past that occurred at different time of the day by each day of the
            week.
          </div>
        </div>
        <div
          style={{
            width: "50%",

            margin: "0 auto",
            padding: "50px",
          }}
        >
          <MapBarhartHour />
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
