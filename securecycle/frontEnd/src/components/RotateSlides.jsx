import React, { useState } from 'react';
import styles from './RotateSlides.module.scss'; 

function RotateSlides() {
  const [ang, setAng] = useState(0);

  const handlePrevClick = () => {
    setAng(prevAng => prevAng + 22.5);
  };

  const handleNextClick = () => {
    setAng(prevAng => prevAng - 22.5);
  };

  const rotationStyle = {
    '--ang': `${ang}deg`
  };


  return (
    <div className={styles.rotateslides}>
      <div className={styles.holder}>
        <div className={`${styles.spinner}`} style={{ '--ang': ang + 'deg' }}>
          <div className={styles.panel + ' ' + styles.a}><button>Explore Victoria Trails</button></div>
          <div className={styles.panel + ' ' + styles.b}><button>Surf Coast Walk</button></div>
          <div className={styles.panel + ' ' + styles.c}><button>Great Victorian Rail Trail</button></div>
          <div className={styles.panel + ' ' + styles.d}><button>Mornington Peninsula Walk</button></div>
          <div className={styles.panel + ' ' + styles.e}><button>Lilydale To Warburton</button></div>
          <div className={styles.panel + ' ' + styles.f}><button>Gippsland Plains Rail Trail</button></div>
          <div className={styles.panel + ' ' + styles.g}><button>You Yangs Mountain Bike Park</button></div>
          <div className={styles.panel + ' ' + styles.h}><button>Mt Buller Bike Park</button></div>
          <div className={styles.panel + ' ' + styles.i}><button>Wilsons Promontory Southern</button></div>
          <div className={styles.panel + ' ' + styles.j}><button>Great Ocean Walk</button></div>
          <div className={styles.panel + ' ' + styles.k}><button>Goldfields Track</button></div>
          <div className={styles.panel + ' ' + styles.l}><button>Forrest Mountain Bike Trails</button></div>
          <div className={styles.panel + ' ' + styles.m}><button>Great Walhalla Alpine Trail</button></div>
          <div className={styles.panel + ' ' + styles.n}><button>Great South West Walk</button></div>
          <div className={styles.panel + ' ' + styles.o}><button>Murray To Mountains Rail Trail</button></div>
          <div className={styles.panel + ' ' + styles.p}><button>East Gippsland Rail Trail</button></div>
          {/* <div className={styles.fade}></div> */}
        </div>
      </div>
      <div className={styles.pagination} style={{rotationStyle}}>
        <button type="button" id="prev" onClick={handlePrevClick}>&#8592;</button>
        <button type="button" id="next" onClick={handleNextClick}>&#8594;</button>
      </div>
    </div>
  );
}

export default RotateSlides;
