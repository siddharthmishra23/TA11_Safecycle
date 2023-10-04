import styles from "./Aboutus.module.css";
import Nav from "../components/Nav";

function Aboutus() {
  return (
    <div>
      <Nav />
      <header className={styles["aboutus"]}>
        <div className={styles["section-header"]}>
          <h2>About Us</h2>
          <p>
            Learn More <span>About Us</span>
          </p>
        </div>
        <div className={styles["aboutus-container"]}>
          <div className={styles["aboutus-container-upper"]}>
            <div className={styles["header-text"]} data-aos="flip-right">
              <h2>Our Mission</h2>
              <p>
                Welcome to Secure Cycling, your dedicated platform committed to
                enhancing the safety and security of cyclists worldwide. Our
                mission is to create a safer cycling environment by providing
                valuable resources, innovative products, and a supportive
                community that empowers cyclists to ride with confidence.
              </p>

              <h2>Our Commitment to Cyclist's Safety</h2>

              <p>
                At Secure Cycling, we recognize the importance of cyclist safety
                on the road. Whether you're a seasoned cyclist or just starting
                out, we believe that every pedal stroke should be accompanied by
                peace of mind. Our team of cycling enthusiasts and safety
                advocates have come together to address the unique challenges
                that cyclists face and offer effective solutions.
              </p>
            </div>
            <div className="row gy-4">
              <img
                style={{
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                }}
                src="/aboutus2.png"
                alt="team"
              />
            </div>
          </div>
          <div className={styles["aboutus-container-lower"]}>
            <div
              className="row gy-1"
              style={{ display: "grid", placeItems: "center" }}
            >
              <img
                style={{
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                  left: "20%",
                  zIndex: "1",
                }}
                src="/aboutus1.png"
                alt="why us"
              />
            </div>
            <div id="why-us" className={styles["why-us section-bg"]}>
              <div className={styles["container"]} data-aos="fade-up">
                <div className="row gy-4">
                  <div
                    className="col-lg-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <div className={styles["why-box"]}>
                      <h3>Why Choose Secure Cycling?</h3>
                      <p>
                        At Secure Cycling, we're not just about bikes; we're
                        about creating a culture of security and safety for all
                        riders. Our unmatched dedication ensures that every
                        cyclist gets the best tools, resources, and community
                        support, making their journey safer and more enjoyable.
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-8 d-flex align-items-center">
                    <div className="row gy-4">
                      <div
                        className="col-xl-4"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                          <i className="bi bi-clipboard-data"></i>
                          <h4>Comprehensive Safety Data</h4>
                          <p>
                            With our in-depth safety research and data
                            analytics, we provide insights that make cycling
                            more secure for everyone.
                          </p>
                        </div>
                      </div>

                      <div
                        className="col-xl-4"
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                          <i className="bi bi-gem"></i>
                          <h4>Innovative Products</h4>
                          <p>
                            Our innovative product line is designed keeping
                            cyclists' safety and comfort at the forefront.
                          </p>
                        </div>
                      </div>

                      <div
                        className="col-xl-4"
                        data-aos="fade-up"
                        data-aos-delay="400"
                      >
                        <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                          <i className="bi bi-inboxes"></i>
                          <h4>Community Support</h4>
                          <p>
                            Become a part of a growing community that offers
                            support, shared experiences, and genuine care for
                            each member.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Aboutus;
