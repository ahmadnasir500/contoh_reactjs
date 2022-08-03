import React, { useEffect, useState, useCallback } from "react";
import { Card } from "react-bootstrap";
import { useAddBookmarkMutation } from "../services/bookmark";
const SectionAyahs = (props) => {
  const bookmark = {
    numberAyah: "",
    numberSurah: "",
  };
  const [addBookmark] = useAddBookmarkMutation();
  const [form, setForm] = useState({ bookmark });
  const handleBookmark = async () => {
      try {
        const response = await addBookmark(form);
        props.onToast(true)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
  };
  return (
    <Card
      className="card-background mb-3 rounded-quran card-hover"
      onClick={() => {
        
        handleBookmark(setForm({
          numberAyah: props.ayah.number.inSurah,
          numberSurah: props.numberSurah,
        }));
      }}
    >
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
