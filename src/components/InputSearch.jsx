import React from "react";
import { InputGroup, Form } from "react-bootstrap";

const InputSearch = (props) => {
  return (
    <>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search surah"
          size="lg"
          className="rounded-quran input-background border-quran" value={props.q}
        />
        <Form.Select aria-label="relevation" className="input-background border-quran" style={{maxWidth:"200px"}}>
          <option>Relevation</option>
          <option>Makkiyah</option>
          <option>Madaniyah</option>
        </Form.Select>
        <Form.Select aria-label="sort" className="rounded-quran input-background border-quran" style={{maxWidth:"100px"}}>
          <option>A - Z</option>
          <option>Z - A</option>
        </Form.Select>
      </InputGroup>
    </>
  );
};
export default InputSearch;
