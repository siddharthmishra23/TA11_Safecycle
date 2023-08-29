import { Container, Row, Col, Button } from "reactstrap";
import styles from "./Testimonial.module.scss";
import { NavLink } from "react-router-dom";
function Testimonial() {
  return (
    <section>
      <Container>
        <Row md="4" className={styles.rowModified}>
          <Col md="6">
            <figure className={styles["testimonial-image"]}>
              <img
                src="/2bikers.png"
                alt="Descriptive image description"
                className="img-fluid"
              />
            </figure>
          </Col>
          <Col md="6">
            <article className={styles["testimonial-info"]}>
              <h1>Cycling in Victoria: Rules, Regulations, and Safety!</h1>
              <p>
                Cycling is not just a mode of transport; it's a lifestyle and a
                commitment to sustainable living. If you're considering cycling
                or are an avid cyclist in Victoria, it's essential to be
                familiar with the local rules and regulations. Not only does
                this ensure your safety, but it also promotes harmony on the
                roads and paths shared with other users.
              </p>
              <p>
                For a comprehensive overview of cycling rules, regulations, and
                safety in Victoria, we recommend visiting the official VicRoads
                website or the Transport Accident Commission (TAC) website.
                Knowledge is the first step to safety. Ride safe and enjoy your
                journey!
              </p>
              <div className={styles.btnBottom}>
                <NavLink to="/resources">
                  <Button color="primary" className={styles["testimonial-btn"]}>
                    Learn More
                  </Button>
                </NavLink>
              </div>
            </article>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Testimonial;
