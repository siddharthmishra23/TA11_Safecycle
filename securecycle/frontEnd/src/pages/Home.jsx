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
<<<<<<< Updated upstream
      <div id="intro">
      <h3>WHAT DO WE DO HERE?</h3>
      <video controls autoPlay muted>
              <source src="/intro.mp4" type="video/mp4" />
      </video>
      </div>
=======
>>>>>>> Stashed changes
      <Information />
      <div>
      <button className="btn">Go to RESOURCES</button>
      </div>
      {/* <Testimonial /> */}
    </div>
  );
}

export default Home;
