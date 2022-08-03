import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import useTitle from "../../utils/useTitle";
const AboutPage = () => {
  useTitle("About");
  return (
    <>
      <Container className="mt-100 vh-100">
        <Row>
          <Col lg={6}>
            <h1 className="display-4 text-white fw-bold">Who am I?</h1>
            <p>
              Hi 👋 perkenalkan, saya{" "}
              <span className="gradient-text">Mukhammad Arifin</span>. Web ini
              saya buat dan kembangkan untuk menyelesaikan tugas akhir pelatihan
              di{" "}
              <a
                href="https://digitalent.kominfo.go.id/"
                className="text-decoration-none"
              >
                DIGITALENT KOMINFO.
              </a>{" "}
              Jika dalam pembuatan content ada dapat beberapa kesalahan mohon
              dimaafkan
            </p>
            <p>
              Thanks To :
              
            </p>
            <ul>
                <li>Allah Swt</li>
                <li>
                  Kak Wendy terimakasih ya kak sudah diajarkan ilmu reactjsnya,
                  semoga menjadi amal jariyah. #Withered Flowers #MentorREA2A
                </li>
                <li>
                  <a
                    href="https://quran-api-id.vercel.app/"
                    className="text-decoration-none"
                  >
                    Quran API
                  </a>
                </li>
              </ul>
          </Col>
          <Col lg={6}>
            <div className="box">
              <img
                src="just-code-light.svg"
                alt="Image from vercel.com"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
      </>
  );
};

export default AboutPage;
