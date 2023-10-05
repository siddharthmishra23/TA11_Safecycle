import React from "react";
import GetStarted from "../components/GetStarted";

function Hero() {
  return (
    <div className="hero">
      <div className="parallax-layer layer-6"></div>
      <div className="parallax-layer layer-5"></div>
      <div className="parallax-layer layer-4"></div>
      <div className="parallax-layer bike-1"></div>
      <div className="parallax-layer bike-2"></div>
      <div className="parallax-layer layer-3"></div>
      <div className="parallax-layer layer-2"></div>
      <div className="parallax-layer layer-2">
        <GetStarted />
      </div>
    </div>
  );
}

export default Hero;
