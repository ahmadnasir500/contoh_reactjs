import React, { useState } from "react";
import { Container, Row, Col, InputGroup, Form } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import Hero from "../../components/Hero";
import CardSurah from "../../components/CardSurah";
import { useGetAllSurahQuery } from "../../services/quran";
import LoadingSpinner from "../../components/Spinner";
import useTitle from "../../utils/useTitle";
const HomePage = () => {
  const { data, error, isLoading } = useGetAllSurahQuery();
  const [query, setQuery] = useState("");
  const [f] = useState(["surah"]);
  const [relevation, setRelevation] = useState(["All"]);
  useTitle("Home");

  const search = (data) => {
    return data.filter((surah) => {
      if (surah.revelation == relevation) {
        return f.some((name) => {
          return (
            surah.name.toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1
          );
        });
      } else if (relevation == "All") {
        return f.some((name) => {
          return (
            surah.name.toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1
          );
        });
      }
    });
  };
  return (
    <>
      <Hero />
      <Container className="mt-3">
        <div className="mx-auto col-lg-8 mb-5">
          <h1 className="text-white text-center fw-bold">Explore Surah</h1>

          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search surah"
              size="lg"
              className="rounded-quran input-background border-quran text-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Form.Select
              aria-label="relevation"
              className="input-background border-quran rounded-quran text-white"
              onChange={(e) => {
                setRelevation(e.target.value);
              }}
              style={{ maxWidth: "200px" }}
            >
              <option value={"All"}>Relevation</option>
              <option>Makkiyah</option>
              <option>Madaniyah</option>
            </Form.Select>
          </InputGroup>
        </div>
        <Row>
          {error ? (
            <>Please refresh</>
          ) : isLoading ? (
            <><LoadingSpinner/></>
          ) : (
            <>
              {search(data).map((surah) => (
                <CardSurah key={surah.number} surah={surah} />
              ))}
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
