import Nav from "../components/Nav";

import React from "react";
import "./PageNotFound.css"; // Assuming you put the CSS in a separate file

const PageNotFound = () => {
  return (
    <div>
      <Nav />
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="col-sm-offset-1 text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>
                  <p>the page you are looking for not available!</p>
                  <a
                    href="/"
                    className="link_404"
                    style={{ borderRadius: "2rem", backgroundColor: "#007bff" }}
                  >
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
