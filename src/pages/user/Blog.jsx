import React, { useEffect, useState } from "react";
import useTitle from "../../utils/useTitle";
import { Link } from "react-router-dom";
import { useDeleteBlogMutation, useGetBlogsQuery } from "../../services/blog";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Stack,
} from "react-bootstrap";
import LoadingSpinner from "../../components/Spinner";

const Blog = () => {
  const { data, isLoading, isError, error } = useGetBlogsQuery();
  const [query, setQuery] = useState("");
  const [f] = useState(["title"]);
  const [category, setCategory] = useState([""]);
  useTitle("Blog");
  const search = (data) => {
    const strDescending = [...data].sort((a, b) => b.timestamp - a.timestamp);
    return strDescending.filter((blog) => {
      if (blog.category == category) {
        return f.some((title) => {
          return (
            blog.title.toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1
  
          );
        });
      } else if (category == "") {
        return f.some((title) => {
          return (
            blog.title.toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1
            
        );
        });
      }
    });
  };
  const [deleteBlog] = useDeleteBlogMutation();
  useEffect(() => {
    isError && <>Error</>;
  }, [isError]);
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin menghapusnya?")) {
      await deleteBlog(id);
    }
  };
  const truncateDescription = (str, count) => {
    if (str.length > count) {
      str = str.substring(0, count) + "....";
    }
    return str;
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Container className="mt-5">
      <div className="mx-auto col-lg-6">
        <h1 className="fw-bold display-2 text-center text-white">Blog</h1>
        <p className="text-center">
          See what’s next for the Web. Do you want to share?{" "}
          <Link to="/create" className="text-decoration-none">
            Create Blog
          </Link>
        </p>
        <Form.Control
          type="text"
          placeholder="Search title blog"
          size="lg"
          className="rounded-quran input-background border-quran mb-3 text-white"
          value={query}
              onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Row>
        {search(data)?.map((item, index) =>
          index == 0 ? (
            <Col sm={12} className="mb-3" key={item.id}>
              <Row>
                <Col sm={6} className="mb-3">
                  <div className="p-3">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="img-fluid rounded-quran"
                      style={{ height:"300px", objectFit: "cover" }}
                    />
                  </div>
                </Col>
                <Col sm={6} className="mb-3 d-flex align-items-center">
                  <div className="p-3">
                    <Link
                      to={`/detail/${item.id}`}
                      className="text-decoration-none color-inherit"
                    >
                      <h3 className="fw-bold text-white">{item.title}</h3>
                      <p> {truncateDescription(item.description, 100)}</p>
                    </Link>
                    <Stack direction="horizontal" gap={2}>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        size="sm"
                        className="bg-quran"
                        variant="outline-danger"
                      >
                        Delete
                      </Button>
                      <Button
                        as={Link}
                        to={`/update/${item.id}`}
                        size="sm"
                        className="bg-quran"
                        variant="outline-primary"
                      >
                        Update
                      </Button>
                    </Stack>
                  </div>
                </Col>
              </Row>
            </Col>
          ) : (
            <Col sm={4} className="mb-3" key={item.id}>
              
              <Card className="h-100 border-0 bg-quran">
                <Card.Body>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="img-fluid rounded-quran mb-3"
                    style={{ height:"200px",width:"400px", objectFit: "cover" }}
                  />
                  <Link
                      to={`/detail/${item.id}`}
                      className="text-decoration-none color-inherit"
                    >
                  <Card.Title className="fw-bold text-white">{item.title}</Card.Title>
                  <Card.Text>{truncateDescription(item.description, 100)}</Card.Text>
                  </Link>
                  <Stack direction="horizontal" gap={2} className="mt-3">
                      <Button
                        onClick={() => handleDelete(item.id)}
                        size="sm"
                        className="bg-quran"
                        variant="outline-danger"
                      >
                        Delete
                      </Button>
                      <Button
                        as={Link}
                        to={`/update/${item.id}`}
                        size="sm"
                        className="bg-quran"
                        variant="outline-primary"
                      >
                        Update
                      </Button>
                    </Stack>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>
    </Container>
  );
};

export default Blog;
