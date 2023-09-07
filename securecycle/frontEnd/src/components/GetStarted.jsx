import { Container, Row, Col, Button } from "reactstrap";
import styles from "./GetStarted.module.css";
import { NavLink } from "react-router-dom";

const GetStarted = () => {
  return (
    <section className={styles["content-section"]}>
      <Container className={styles["content-container"]}>
        <article className={styles["inspiration-info"]}>
          <h1 data-aos="fade-up" data-aos-duration="3000">
            PEDAL TOWARDS SAFETY
          </h1>
          <p
            className={styles["hero-p"]}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            Discover Safe Routes Near You and Master Bike Regulations
          </p>
          <p
            className={styles["hero-p"]}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            Explore, Navigate, and Stay Safe with Us. <br></br>Your Journey to Safe Cycling Begins Here!
          </p>
          <a className={styles["begin"]} href="#begin">Let's begin</a>
          {/* <NavLink to="/resources">
            <Button color="primary" className={styles["inspiration-btn"]}>
              Let's Explore
            </Button>
          </NavLink> */}
        </article>
      </Container>
    </section>
  );
};

export default GetStarted;