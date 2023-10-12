import React, { useState, useEffect, useRef } from "react";
import styles from "./RotateSlides.module.scss";
import Modal from "./Modal.jsx";

function RotateSlides({
  selected_trail,
  sourceOfSelection,
  onSelect: handleTrailSelectFromSpinner,
}) {
  const [ang, setAng] = useState(0);
  const [selectedTrailName, setSelectedTrailName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  function scrollToSection(id) {
    if (id === "infoSection") {
      setIsModalOpen(true);
      console.log("Opening modal");
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
      console.log("else modal");
    }
  }

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
  const prevAngRef = useRef();

  useEffect(() => {
    if (ang !== prevAngRef.current) {
      // Only execute this logic if `ang` has truly changed
      let normalizedAngle = ang % 360;
      if (normalizedAngle < 0) normalizedAngle += 360;

      const trailName = trails[normalizedAngle];

      if (trailName && trailName !== selected_trail) {
        setSelectedTrailName(trailName);
        if (handleTrailSelectFromSpinner) {
          console.log("Calling onSelect with:", trailName);
          handleTrailSelectFromSpinner(trailName);
        }
      }
    }
  }, [ang, handleTrailSelectFromSpinner, trails, selected_trail]);

  return (
    <div className={styles.rotateslides}>
      <div className={styles.holder}>
        <div className={`${styles.spinner}`} style={{ "--ang": ang }}>
          <div className={styles.panel + " " + styles.a}>
            <p>Explore Victoria Trails</p>
          </div>
          <div className={styles.panel + " " + styles.b}>
            <p>Surf Coast Walk</p>
          </div>
          <div className={styles.panel + " " + styles.c}>
            <p>Great Victorian Rail Trail</p>
          </div>
          <div className={styles.panel + " " + styles.d}>
            <p>Mornington Peninsula Walk</p>
          </div>
          <div className={styles.panel + " " + styles.e}>
            <p>Lilydale To Warburton</p>
          </div>
          <div className={styles.panel + " " + styles.f}>
            <p>Gippsland Plains Rail Trail</p>
          </div>
          <div className={styles.panel + " " + styles.g}>
            <p>You Yangs Mountain Bike Park</p>
          </div>
          <div className={styles.panel + " " + styles.h}>
            <p>Mt Buller Bike Park</p>
          </div>
          <div className={styles.panel + " " + styles.i}>
            <p>Wilsons Promontory Southern</p>
          </div>
          <div className={styles.panel + " " + styles.j}>
            <p>Great Ocean Walk</p>
          </div>
          <div className={styles.panel + " " + styles.k}>
            <p>Goldfields Track</p>
          </div>
          <div className={styles.panel + " " + styles.l}>
            <p>Forrest Mountain Bike Trails</p>
          </div>
          <div className={styles.panel + " " + styles.m}>
            <p>Great Walhalla Alpine Trail</p>
          </div>
          <div className={styles.panel + " " + styles.n}>
            <p>Great South West Walk</p>
          </div>
          <div className={styles.panel + " " + styles.o}>
            <p>Murray To Mountains Rail Trail</p>
          </div>
          <div className={styles.panel + " " + styles.p}>
            <p>East Gippsland Rail Trail</p>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() => scrollToSection("mapSection")}
          className={styles["button_rotate"]}
        >
          View on Map
        </button>
        {selectedTrailName != "Explore Victoria Trails" && (
          <button
            onClick={() => scrollToSection("infoSection")}
            className={styles["button_rotate"]}
          >
            More Information
          </button>
        )}
      </div>
      {/* <div>{selectedTrailName}</div> */}
      <div className={styles.pagination} style={{ rotationStyle }}>
        <button type="button" id="prev" onClick={handlePrevClick}>
          &#8592;
        </button>
        <button type="button" id="next" onClick={handleNextClick}>
          &#8594;
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trailName={selectedTrailName}
      />
    </div>
  );
}

export default RotateSlides;
