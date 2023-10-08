import React, { useState, useEffect, onSelect } from "react";
import styles from "./RotateSlides.module.scss";

function RotateSlides({onSelect:handleTrailSelect}) {
  const [ang, setAng] = useState(0);
  const [selectedTrailName, setSelectedTrailName] = useState("");
  


  const handlePrevClick = () => {
    console.log("prev");
    setAng((prevAng) => prevAng + 22.5);
  };

  const handleNextClick = () => {
    console.log("next");

    setAng((prevAng) => prevAng - 22.5);
  };

  const rotationStyle = {
    "--ang": `${ang}deg`,
  };

  const trails = {
    360: "Explore Victoria Trails",
    337.5: "Surf Coast Walk",
    315: "Great Victorian Rail Trail",
    292.5: "Mornington Peninsula Walk",
    270: "Lilydale To Warburton",
    247.5: "Gippsland Plains Rail Trail",
    225: "You Yangs Mountain Bike Park",
    202.5: "Mt Buller Bike Park",
    180: "Wilsons Promontory Southern",
    157.5: "Great Ocean Walk",
    135: "Goldfields Track",
    112.5: "Forrest Mountain Bike Trails",
    90: "Great Walhalla Alpine Trail",
    67.5: "Great South West Walk",
    45: "Murray To Mountains Rail Trail",
    22.5: "East Gippsland Rail Trail",
    0: "Explore Victoria Trails",
  };

  useEffect(() => {
    // Get the normalized angle (within 0 to 360)
    let normalizedAngle = ang % 360;
    if (normalizedAngle < 0) normalizedAngle += 360;
  
    const trailName = trails[normalizedAngle];
    if (trailName) {
      setSelectedTrailName(trailName);
      if (handleTrailSelect) {
        console.log("Calling onSelect with:", trailName);  // <-- Add this
        handleTrailSelect(trailName);
     }else {
        console.log("Trail name not found for angle"); 
    }
    } 
  }, [ang, handleTrailSelect, trails]);
  


  return (
    <div className={styles.rotateslides}>
      <div className={styles.holder}>
        <div className={`${styles.spinner}`} style={{ "--ang": ang }}>
          <div className={styles.panel + " " + styles.a}>
            <button>Explore Victoria Trails</button>
          </div>
          <div className={styles.panel + " " + styles.b}>
            <button>Surf Coast Walk</button>
          </div>
          <div className={styles.panel + " " + styles.c}>
            <button>Great Victorian Rail Trail</button>
          </div>
          <div className={styles.panel + " " + styles.d}>
            <button>Mornington Peninsula Walk</button>
          </div>
          <div className={styles.panel + " " + styles.e}>
            <button>Lilydale To Warburton</button>
          </div>
          <div className={styles.panel + " " + styles.f}>
            <button>Gippsland Plains Rail Trail</button>
          </div>
          <div className={styles.panel + " " + styles.g}>
            <button>You Yangs Mountain Bike Park</button>
          </div>
          <div className={styles.panel + " " + styles.h}>
            <button>Mt Buller Bike Park</button>
          </div>
          <div className={styles.panel + " " + styles.i}>
            <button>Wilsons Promontory Southern</button>
          </div>
          <div className={styles.panel + " " + styles.j}>
            <button>Great Ocean Walk</button>
          </div>
          <div className={styles.panel + " " + styles.k}>
            <button>Goldfields Track</button>
          </div>
          <div className={styles.panel + " " + styles.l}>
            <button>Forrest Mountain Bike Trails</button>
          </div>
          <div className={styles.panel + " " + styles.m}>
            <button>Great Walhalla Alpine Trail</button>
          </div>
          <div className={styles.panel + " " + styles.n}>
            <button>Great South West Walk</button>
          </div>
          <div className={styles.panel + " " + styles.o}>
            <button>Murray To Mountains Rail Trail</button>
          </div>
          <div className={styles.panel + " " + styles.p}>
            <button>East Gippsland Rail Trail</button>
          </div>
          {/* <div className={styles.fade}></div> */}
        </div>
      </div>
      <div>{selectedTrailName}</div>
      <div className={styles.pagination} style={{ rotationStyle }}>
        <button type="button" id="prev" onClick={handlePrevClick}>
          &#8592;
        </button>
        <button type="button" id="next" onClick={handleNextClick}>
          &#8594;
        </button>
      </div>
      
    </div>
  );
}

export default RotateSlides;
