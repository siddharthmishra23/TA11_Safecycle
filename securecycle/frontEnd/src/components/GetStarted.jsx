import { Container, Row, Col, Button } from "reactstrap";
import styles from "./GetStarted.module.css";
import { NavLink } from "react-router-dom";

const GetStarted = () => {
  return (
    <section className={styles["content-section"]}>
      <Container className={styles["content-container"]}>
        <Row>
          <Col md="6">
            <article className={styles["inspiration-info"]}>
              <h1>Pedal Towards Safety!</h1>
              <p>
                Join our community of cycling enthusiasts and discover the best
                routes, safety tips, and gear recommendations tailored for you.
              </p>
              <NavLink to="/resources">
                <Button color="primary" className={styles["inspiration-btn"]}>
                  Let's Explore
                </Button>
              </NavLink>
            </article>
          </Col>

          <Col md="6">
            <figure className={styles["inspiration-image"]}>
              <img
                src="https://i.postimg.cc/65QxYYzh/001234.png"
                alt="Descriptive image description"
                className="img-fluid"
              />
            </figure>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GetStarted;
