import React, { useRef } from "react";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";

const CareerPage = () => {
  const sectionPositions = useRef(null);
  const handleClick = () => {
    sectionPositions.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Container className="mt-100">
        <div className="mx-auto col-lg-12 vh-100">
          <h1 className="text-white text-center display-2 fw-bold">
            Help us to be the best
          </h1>

        </div>
        
      </Container>
    </>
  );
};

export default CareerPage;
