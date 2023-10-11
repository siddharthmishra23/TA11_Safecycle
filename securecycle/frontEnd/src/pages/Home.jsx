import { useEffect } from "react";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import { NavLink } from "react-router-dom";
import "./Home.scss";
import Information from "../components/Information";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
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
        <div className="wrapper home-screen">
          <div className="clickable-card" onClick={() => navigate("/Design")}>
            From frames to finishes, personalize every detail of your bicycle to
            make it uniquely yours. Dive into our design studio and bring your
            vision to life. Ready to roll in style?
            <NavLink to="/Design">
              <button className="icon-btn">
                <i className="fa-solid fa-spray-can icon-size"></i>
              </button>
            </NavLink>
          </div>
          <div className="clickable-card" onClick={() => navigate("/Trails")}>
            From serene woodland routes to exhilarating mountain paths, find the
            perfect trail tailored to your next ride. Dive into detailed maps, .
            Click to embark on your next journey
            <NavLink to="/Trails">
              <button className="icon-btn">
                <i className="fa-solid fa-person-biking icon-size"></i>
              </button>
            </NavLink>
          </div>
          <div
            className="clickable-card"
            onClick={() => navigate("/resources")}
          >
            Stay informed about the latest bike regulations and learn how to
            protect yourself and others on the road with practical tips,
            ensuring a safer biking experience for all.
            <NavLink to="/resources">
              <button className="icon-btn">
                <i className="fas fa-car-burst icon-size"></i>
              </button>
            </NavLink>
          </div>
          <div className="clickable-card" onClick={() => navigate("/travel")}>
            Plan your journeys confidently with our safe route navigation tools.
            <NavLink to="/travel">
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
