import { Container, Row, Col } from "reactstrap";
import styles from "./Information.module.css";
import "animate.css/animate.min.css";
const Information = () => {
  return (
    <Container>
      <h2 className={styles.h2}>Victorian Guidelines</h2>
      <Container>
        <Row>
          <Col md="8" className={`${styles.step1} offset-md-2`}>
            <Row
              className={`animate__animated animate__bounceInLeft animate__delay-1s ${styles.box} ${styles["shape-1"]} ${styles.animated} `}
            >
              <Col xs="7" sm="4" md="4" className={styles.shape}>
                <div className={styles.number}>
                  <h1>01</h1>
                </div>
              </Col>
              <Col
                xs={{ size: 5, offset: 1 }}
                sm={{ size: 4, offset: 1 }}
                md={{ size: 4, offset: 1 }}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris in rhoncus arcu, et volutpat mauris.
                </p>
              </Col>
              <Col sm="4" md="4" className="hidden-xs text-center">
                <i className={`material-icons ${styles["md-56"]}`}>&#xE873;</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md="8" className={`${styles.step1} offset-md-2`}>
            <Row
              className={`animate__animated animate__bounceInRight animate__delay-2s ${styles.box} ${styles["shape-2"]} ${styles.animated} `}
            >
              <Col xs="7" sm="4" md="4" className={styles.shape}>
                <div className={styles.number}>
                  <h1>01</h1>
                </div>
              </Col>
              <Col
                xs={{ size: 5, offset: 1 }}
                sm={{ size: 4, offset: 1 }}
                md={{ size: 4, offset: 1 }}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris in rhoncus arcu, et volutpat mauris.
                </p>
              </Col>
              <Col sm="4" md="4" className="hidden-xs text-center">
                <i className={`material-icons ${styles["md-56"]}`}>&#xE873;</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md="8" className={`${styles.step1} offset-md-2`}>
            <Row
              className={`animate__animated animate__bounceInLeft animate__delay-3s ${styles.box} ${styles["shape-3"]} ${styles.animated} `}
            >
              <Col xs="7" sm="4" md="4" className={styles.shape}>
                <div className={styles.number}>
                  <h1>01</h1>
                </div>
              </Col>
              <Col
                xs={{ size: 5, offset: 1 }}
                sm={{ size: 4, offset: 1 }}
                md={{ size: 4, offset: 1 }}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris in rhoncus arcu, et volutpat mauris.
                </p>
              </Col>
              <Col sm="4" md="4" className="hidden-xs text-center">
                <i className={`material-icons ${styles["md-56"]}`}>&#xE873;</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md="8" className={`${styles.step1} offset-md-2`}>
            <Row
              className={`animate__animated animate__bounceInRight animate__delay-4s ${styles.box} ${styles["shape-4"]} ${styles.animated} `}
            >
              <Col xs="7" sm="4" md="4" className={styles.shape}>
                <div className={styles.number}>
                  <h1>01</h1>
                </div>
              </Col>
              <Col
                xs={{ size: 5, offset: 1 }}
                sm={{ size: 4, offset: 1 }}
                md={{ size: 4, offset: 1 }}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris in rhoncus arcu, et volutpat mauris.
                </p>
              </Col>
              <Col sm="4" md="4" className="hidden-xs text-center">
                <i className={`material-icons ${styles["md-56"]}`}>&#xE873;</i>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Information;
