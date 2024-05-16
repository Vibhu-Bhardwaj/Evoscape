import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter
      className="text-center text-lg-start text-muted"
      style={{ backgroundColor: "rgba(235, 238, 239, 1)" }}
    >
      <section className=" d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="text-dark">
          <a href="https://www.google.com/" className="me-4 text-reset">
            <MDBIcon fa icon="globe" />
          </a>
          <a href="https://www.instagram.com/" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="https://www.linkedin.com/" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="https://github.com/" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className="text-dark">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Evoscape
              </h6>
              <p>
                "It is an online platform that facilitates the buying and
                selling of second-hand items. It provides a user-friendly
                interface for individuals to list their used goods and connect
                with potential buyers. Users can browse through various
                categories, including electronics, vehicles, furniture,
                clothing, and more."
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">About Us</h6>
              <p>
                <a href="#!" className="text-reset">
                  About Evoscape Group
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Careers
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Contact Us
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  EvoscapePeople
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Waah Jobs
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Evoscape</h6>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Sitemap
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Legal &amp; Privacy
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Blog
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Autos Sell Car
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Chitkara University, Rajpura
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                vibhubhardwaj9867@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 91 7973782107
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center text-white p-4"
        style={{ backgroundColor: "rgba(0, 47, 52, 1)" }}
      >
        © 2024 Copyright:
        <a className="fw-bold text-white" href="/">
          Evoscape.com
        </a>
      </div>
    </MDBFooter>
  );
}
