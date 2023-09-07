import { useEffect } from "react";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
// import { NavLink } from "react-router-dom";
// import { Button } from "reactstrap";
import "./Home.scss";
import Information from "../components/Information";
import GetStarted from "../components/GetStarted";
import Testimonial from "../components/Testimonial";
import BarChart from "../components/BarChart";

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
      <div id="begin"></div>
      <div id="intro">
        <h3 data-aos="fade-up">WHAT DO WE DO HERE?</h3>
        <div>
          <iframe
            className="videoHome"
            src="https://www.youtube.com/embed/MnMa0Hbx3tg?si=SmR47rGiFlz9Visz&loop=1&autoplay=1&mute=1&loop=1"
            title="Welcome to Cycle Street"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <Information />
    </div>
  );
}

export default Home;
