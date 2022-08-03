import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <div className="vh-100">
      <div className="overlay-content d-flex justify-content-center">
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          className="position-fixed"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
};

export default LoadingSpinner;
