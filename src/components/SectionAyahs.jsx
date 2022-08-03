import React from "react";
import { Card } from "react-bootstrap";
const SectionAyahs = (props) => {
  return (
    <Card className="card-background mb-3 rounded-quran">
      <Card.Body>
        <div className="mb-3">
          <div className="d-flex justify-content-between text-white">
            <div className="me-3 card-icon">{props.ayah.number.inSurah}</div>
            <h1 className="text-end">{props.ayah.arab}</h1>
          </div>
          <p>{props.ayah.translation}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SectionAyahs;
