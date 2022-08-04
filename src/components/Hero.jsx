import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { auth } from "../services/auth";
import { useAuthState } from "react-firebase-hooks/auth";
const Hero = () => {
  
  const [user, loading, error] = useAuthState(auth);
  return (
    <Container className="h-100 mt-100">
      
      <Row>
        <Col lg={6}>
          <h1 className="display-4 fw-bold text-white">
            Sudahkah kamu membaca Al Quran hari ini?
          </h1>
          <p>
            Siapa yang membaca satu huruf dari Al Quran maka baginya satu
            kebaikan dengan bacaan tersebut, satu kebaikan dilipatkan menjadi 10
            kebaikan.(HR. Tirmidzi)
          </p>
          {!user && <Button as={Link} to={"/register"} className="btn-quran w-50">
            Create Account
          </Button>}
          
        </Col>
        <Col lg={6} className="d-none d-sm-block">
          <div className="d-sm-none d-md-block shape purple-hero"></div>
          <div className="d-sm-none d-md-block shape green-hero"></div>
          <div className="d-sm-none d-md-block shape orange-hero"></div>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
