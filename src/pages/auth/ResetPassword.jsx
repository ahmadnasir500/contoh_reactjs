import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  resetPassword
} from "../../services/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Form, Row, Col, Button, Stack } from "react-bootstrap";
const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [res, setRes] = useState({});
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const setField = (field, value) => {
      setForm({
        ...form,
        [field]: value,
      });
      if (!!errors[field])
        setErrors({
          ...errors,
          [field]: null,
        });
    };
  
    const findFormErrors = () => {
      const { email} = form;
      const newErrors = {};
      if (!email || email === "") newErrors.email = "Please type email address.";
      return newErrors;
    };
    const [user, isLoading, error] = useAuthState(auth);
    const handleSubmit = async (event) => {
      event.preventDefault();
      const newErrors = findFormErrors();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        const response = await resetPassword(form.email);
        setRes(response)
      }
    };
    useEffect(() => {
      if (user) {
        navigate("/");
      }
    }, [user, isLoading, navigate]);
    return (
        <Container className="mt-5">
          <div className="text-center mb-3">
            <Link to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#fff"
                viewBox="0 0 16 16"
              >
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
              </svg>
            </Link>
          </div>
          <h3 className="text-center fw-bold text-white">
            Reset Password
          </h3>
          <p className="text-center">Please enter your detail. we'll send you instructions.</p>
          <div className="mx-auto col-lg-4">
            <small>{res.length > 0 ? res : ''}</small>
            <Form noValidate onSubmit={handleSubmit} className="mb-3">
              <Row className="mb-3">
                <Form.Group as={Col} lg="12" controlId="email" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Type your email address"
                    className="rounded-quran input-background border-quran text-white"
                    onChange={(e) => setField("email", e.target.value)}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
  
              </Row>
              <div className="d-grid gap-2">
                <Button className="btn-quran w-100" type="submit">
                  Send instructions
                </Button>
              </div>
            </Form>
          </div>
          <p className="text-center">
            <Link to={"/login"} className="text-decoration-none">
            Back to log in page 
            </Link>
          </p>
        </Container>
    );

}
export default ResetPasswordPage;