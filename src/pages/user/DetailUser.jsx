import React, { useEffect, useState } from "react";
import { storage } from "../../apis/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Container, Button, Card, Form, Row, Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth} from "../../services/auth";
import { updateProfile } from "firebase/auth";

const DetailUser = () => {
  const nameTime = new Date().getTime();
  const [user] = useAuthState(auth);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setForm({ ...form });
    }
  }, [form]);

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
    const { displayName } = form;
    const newErrors = {};
    if (!displayName || displayName === "")
      newErrors.displayName = "Please type display name user.";

    return newErrors;
  };
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, "user/" + nameTime + file.name);
      const uploadFile = uploadBytesResumable(storageRef, file);
      uploadFile.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
            setForm((prev) => ({ ...prev, photoURL: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const response = await updateProfile(auth.currentUser, {
        displayName: form.displayName,
        photoURL: form.photoURL,
      });
      navigate("/user")
      console.log(response);
    }
  };

  return (
    <Container className="mt-100">
      <div className="mx-auto col-lg-8">
        <h1 className="fw-bold display-4 text-white text-center">User</h1>
        <Card className="card-background mb-3 rounded-quran">
          <Card.Body>
            <img src={user.photoURL} alt={user.displayName} className="mb-3 mx-auto img-fluid rounded-quran" style={{width:"100px",height:"100px"}} />
            <Form noValidate onSubmit={handleSubmit} className="mb-3">
              <Row className="mb-3">
                <Form.Group as={Col} lg="12" controlId="title" className="mb-3">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={user.displayName}
                    placeholder="Type display name"
                    className="rounded-quran input-background text-white border-quran"
                    onChange={(e) => setField("displayName", e.target.value)}
                    isInvalid={!!errors.displayName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.displayName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="photoURL" className="mb-3">
                  <Form.Label>Photo Profile</Form.Label>
                  <Form.Control
                    className="input-background text-white border-quran"
                    type="file"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>
              </Row>
              <div className="d-grid gap-2">
                <Button className="btn-quran w-25" type="submit">
                  Save Profile
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default DetailUser;
