import React, {useState} from "react";
import { Container, Card, Stack, Button, Toast, ToastContainer  } from "react-bootstrap";
import ReactAudioPlayer from "react-audio-player";
import SectionAyahs from "./SectionAyahs";
const DetailSurah = (props) => {
  const [show, setShow] = useState(false);
  const ayahs = props.surah.ayahs;
  return (
    <Container className="mt-100">
      <div className="mx-auto col-lg-8">
        <div className="mb-3">
          <h1 className="fw-bold display-2 gradient-text text-center">
            {props.surah.name}
          </h1>
          <ul className="list-inline list-separator small text-center">
            <li className="list-inline-item">Number : {props.surah.number}</li>
            <li className="list-inline-item">
              Number of Ayahs : {props.surah.numberOfAyahs}
            </li>

            <li className="list-inline-item">
              Translation : {props.surah.translation}
            </li>
            <li className="list-inline-item">
              Revelation : {props.surah.revelation}
            </li>
          </ul>
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-center"
          >
            <Button size="sm" className="bg-quran" variant="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>{" "}
              Like
            </Button>
            <Button size="sm" className="bg-quran" variant="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>{" "}
              Add My List
            </Button>
            <Button size="sm" className="bg-quran" variant="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
              </svg>{" "}
              Share
            </Button>
          </Stack>
        </div>
        <Card className="card-background rounded-quran mb-3">
          <Card.Body>
            <h6>Description : </h6>
            <p>{props.surah.description}</p>
            {}
          </Card.Body>
        </Card>

        {ayahs.map((item, index) => [
          <SectionAyahs
            key={item}
            ayah={item}
            numberSurah={props.surah.number}
            onToast={setShow}
          />,
        ])}
      </div>
      <div className="sticky-footer">
        <ReactAudioPlayer
          src={props.surah.audio}
          controls
          className="w-100 bg-quran"
        />
      </div>
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9001 }}>
        <div role="alert" aria-live="assertive" aria-atomic="true">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide className="bg-primary"
          >
            <Toast.Body className="text-white">
              Bookmarks saved
            </Toast.Body>
          </Toast>
        </div>
      </div>
    </Container>
  );
};

export default DetailSurah;
	