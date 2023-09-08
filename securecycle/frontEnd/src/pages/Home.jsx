import { useEffect } from "react";
import Hero from "../components/Hero";
import Nav from "../components/Nav";

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
        <h3 data-aos="fade-up">WHAT DO WE DO HERE?</h3>
        {/* <div>
          <iframe
            className="videoHome"
            src="https://www.youtube.com/embed/MnMa0Hbx3tg?si=SmR47rGiFlz9Visz&loop=1&autoplay=1&mute=1&loop=1"
            title="Welcome to Cycle Street"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div> */}
        <div className="wrapper">
                <div>
                We provide valuable insights into accident trends, contributing factors, and geographical hotspots, empowering you with knowledge to make informed decisions.
                <a href="\resources">
                  <button class="icon-btn"><i class="fa-solid fa-car-burst icon-size"></i></button>
                </a>
                </div>
                <div>
                Stay informed about the latest bike regulations and learn how to protect yourself and others on the road with practical tips, ensuring a safer biking experience for all.
                <a href="\resources">
                  <button class="icon-btn"><i class="fas fa-person-biking icon-size"></i></button>
                </a>
                </div>
                <div>
                Plan your journeys confidently with our safe route navigation tools. Coming soon...
                <a href="\travel">
                  <button class="icon-btn"><i class="fa-solid fa-route icon-size"></i></button>
                </a>
                </div>
              </div>
              <div className="clearfix"></div>
        </div>
      <Information />
    </div>
  );
}

export default Home;
