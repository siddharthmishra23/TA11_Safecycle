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
            Explore the safest cycling routes, gain essential safety tips, and
          </p>
          <p
            className={styles["hero-p"]}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            Prioritize your safety with every ride.
          </p>
          <NavLink to="/travel">
            <Button color="primary" className={styles["inspiration-btn"]}>
              Let's begin
            </Button>
          </NavLink>
        </article>
      </Container>
    </section>
  );
};

export default GetStarted;
