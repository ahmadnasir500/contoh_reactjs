import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  loginUserWithEmailAndPassword,
  loginByGithub,
  loginByGoogle,
} from "../../services/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Form, Row, Col, Button, Stack } from "react-bootstrap";

const LoginPage = () => {
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
    const { email, password } = form;
    const newErrors = {};
    if (!email || email === "") newErrors.email = "Please type email address.";
    if (!password || password === "")
      newErrors.password = "Please type password";
    return newErrors;
  };
  const [user, isLoading, error] = useAuthState(auth);
  const handleLoginByGoogle = () => {
    loginByGoogle();
  };

  const handleLoginByGithub = () => {
    loginByGithub();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const response = await loginUserWithEmailAndPassword(
        form.email,
        form.password
      );
      setRes(response);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);
  return (
    <>
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
          Log in into Moon Stars
        </h3>
        <p className="text-center">Welcome back! Please enter your detail</p>
        <small>{res ? "" : res}</small>
        <div className="mx-auto col-lg-4">
          <Stack direction="horizontal" gap={2}>
            <Button className="btn-quran w-50" onClick={handleLoginByGoogle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
            </Button>

            <Button className="btn-quran w-50" onClick={handleLoginByGithub}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </Button>
          </Stack>
          <hr />
          {res.length > 0 ? res : ""}
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

              <Form.Group as={Col} lg="12" controlId="email" className="mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Label>Password</Form.Label>
                  <Form.Label>
                    <Link
                      to={"/reset-password"}
                      className="text-decoration-none"
                    >
                      Forgot Password?
                    </Link>
                  </Form.Label>
                </div>
                <Form.Control
                  required
                  type="password"
                  placeholder="Type your password"
                  className="rounded-quran input-background border-quran text-white"
                  onChange={(e) => setField("password", e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="d-grid gap-2">
              <Button className="btn-quran w-100" type="submit">
                Log in
              </Button>
            </div>
          </Form>
        </div>
        <p className="text-center">
          {" "}
          Don't have an account?{" "}
          <Link to={"/register"} className="text-decoration-none">
            Register
          </Link>
        </p>
      </Container>
    </>
  );
};

export default LoginPage;
