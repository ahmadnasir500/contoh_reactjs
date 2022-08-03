import React, { useEffect, useState } from "react";
import { storage } from "../../apis/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  useAddBlogMutation,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "../../services/blog";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Container, Button, Card, Form, Row, Col } from "react-bootstrap";
const AddEditBlog = () => {
  const nameTime = new Date().getTime()
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [addBlog] = useAddBlogMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: blog } = useGetSingleBlogQuery(id ? id : skipToken);
  const [updateBlog] = useUpdateBlogMutation();
  useEffect(() => {
    if (id && blog) {
      setForm({ ...form });
    }
  }, [id, blog]);
  
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
    const { title, description, content, category, img } = form;
    const newErrors = {};
    if (!title || title === "") newErrors.title = "Please type title blog.";
    if (!description || description === "")
      newErrors.description = "Please type description";
    if (!content || content === "") newErrors.content = "Please type content";
    if (!category || category === "")
      newErrors.category = "Please type category";
    return newErrors;
  };
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, 'images/' + nameTime+file.name);
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
            setForm((prev) => ({ ...prev, img: downloadURL }));
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
      if (!id) {
        await addBlog(form);
        navigate("/blog");
      } else {
        await updateBlog({ id, form });
        navigate("/blog");
      }
    }
  };

  return (
    <Container className="mt-100">
      <div className="mx-auto col-lg-8">
        <h1 className="fw-bold display-4 text-white text-center">
          {id ? "Update Blog" : "Create Blog"}
        </h1>
        <Card className="card-background mb-3 rounded-quran">
          <Card.Body>
            <Form noValidate onSubmit={handleSubmit} className="mb-3">
              <Row className="mb-3">
                <Form.Group as={Col} lg="12" controlId="title" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={id ? blog?.title : ""}
                    placeholder="Type title blog"
                    className="rounded-quran input-background text-white border-quran"
                    onChange={(e) => setField("title", e.target.value)}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  lg="12"
                  controlId="description"
                  className="mb-3"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    required
                    defaultValue={id ? blog?.description : ""}
                    placeholder="Type description"
                    className="rounded-quran input-background text-white border-quran"
                    onChange={(e) => setField("description", e.target.value)}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  lg="12"
                  controlId="content"
                  className="mb-3"
                >
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    defaultValue={id ? blog?.content : ""}
                    placeholder="Type content"
                    className="rounded-quran input-background text-white border-quran"
                    onChange={(e) => setField("content", e.target.value)}
                    isInvalid={!!errors.content}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.content}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  lg="12"
                  controlId="category"
                  className="mb-3"
                >
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    rows={3}
                    required
                    defaultValue={id? blog?.category : ""}
                    placeholder="Choose category"
                    className="rounded-quran input-background text-white border-quran"
                    onChange={(e) => setField("category", e.target.value)}
                    isInvalid={!!errors.category}
                  >
                    <option value={""}>Choose</option>
                    <option value="Technology">Technology</option>
                    <option value="News">News</option>
                    <option value="Bussines">Bussines</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.content}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="img" className="mb-3">
                  <Form.Label>Image Blog</Form.Label>
                  <Form.Control className="input-background text-white border-quran"
                    type="file"
                    disabled={id ? true : false}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <small className="text-danger">{id && 'Image Blog disabled to update'}</small>
                </Form.Group>
              </Row>
              <div className="d-grid gap-2">
                <Button className="btn-quran w-25" type="submit">
                  {id ? "Update Blog" : "Submit Blog"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AddEditBlog;
