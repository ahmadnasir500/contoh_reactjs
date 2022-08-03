import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const CardSurah = (props) => {
  return (
    <Col sm={4} className="mb-3">
      <Link
        to={`/surah/${props.surah.number}`}
        className="text-decoration-none"
        style={{ color: "inherit" }}
      >
        <Card className="rounded-quran card-background h-100 card-hover">
          <Card.Body className="d-flex align-items-center">
            <div className="me-3 card-icon">{props.surah.name.charAt(0)}</div>
            <div>
              <h6 className="fw-bold text-white">
                {props.surah.number}. {props.surah.name}
              </h6>
              <div>
                <div className="small">
                  {props.surah.translation} - {props.surah.revelation}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default CardSurah;
