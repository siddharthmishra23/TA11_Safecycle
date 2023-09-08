import { useEffect } from "react";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import { NavLink } from "react-router-dom";
import "./Home.scss";
import Information from "../components/Information";
import GetStarted from "../components/GetStarted";
import Testimonial from "../components/Testimonial";

function Home() {
  useEffect(() => {
    const wf = document.createElement("script");
    wf.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
    wf.type = "text/javascript";
    wf.async = "true";
    const s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(wf, s);

    window.WebFontConfig = {
      google: {
        families: [
          "Lato:400,300,300italic,400italic,700,700italic,900,900italic:latin",
        ],
      },
    };
  }, []);

  return (
    <div className="App">
      <Nav />
      <Hero />
      <div id="intro">
        <h2 data-aos="fade-up" style={{ color: "#0b0d7b" }}>
          WHAT DO WE DO HERE?
        </h2>
        <div className="wrapper">
          <div>
            We provide valuable insights into accident trends, contributing
            factors, and geographical hotspots, empowering you with knowledge to
            make informed decisions.
            <NavLink to="/resources">
              <button className="icon-btn">
                <i className="fa-solid fa-car-burst icon-size"></i>
              </button>
            </NavLink>
          </div>
          <div>
            Stay informed about the latest bike regulations and learn how to
            protect yourself and others on the road with practical tips,
            ensuring a safer biking experience for all.
            <NavLink to="/resources">
              <button className="icon-btn">
                <i className="fas fa-person-biking icon-size"></i>
              </button>
            </NavLink>
          </div>
          <div>
            Plan your journeys confidently with our safe route navigation tools.
            Coming soon...
            <NavLink to="/resources">
              <button className="icon-btn">
                <i className="fa-solid fa-route icon-size"></i>
              </button>
            </NavLink>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
      <Information />
    </div>
  );
}

export default Home;
