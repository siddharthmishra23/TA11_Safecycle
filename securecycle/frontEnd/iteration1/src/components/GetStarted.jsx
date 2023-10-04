import { Container, Row, Col, Button } from "reactstrap";
import styles from "./GetStarted.module.css";
import { NavLink } from "react-router-dom";

const GetStarted = () => {
  return (
    <section className={styles["content-section"]}>
      <Container className={styles["content-container"]}>
        <article className={styles["inspiration-info"]}>
          <h1 data-aos="fade-up" data-aos-duration="3000">
            PEDAL TOWARDS SAFETY!
          </h1>
          <p
            className={styles["hero-p"]}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            Join our community of cycling enthusiasts and discover the best
          </p>
          <p
            className={styles["hero-p"]}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            routes, safety tips, and gear recommendations tailored for you.
          </p>
          <NavLink to="/resources">
            <Button color="primary" className={styles["inspiration-btn"]}>
              Let's Explore
            </Button>
          </NavLink>
        </article>
      </Container>
    </section>
  );
};

export default GetStarted;
