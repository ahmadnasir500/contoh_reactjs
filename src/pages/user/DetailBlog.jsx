import React, { useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useGetSingleBlogQuery } from "../../services/blog";

const DetailBlog = () => {
  const { id } = useParams();
  const { data, isError, error } = useGetSingleBlogQuery(id ? id : skipToken);
  console.log(data);
  useEffect(() => {
    isError && <>Error from blog detail</>;
  }, [isError]);
  return (
    <>
      <Container className="mt-100">
        <div className="mx-auto col-lg-8">
          <img
            src={data?.img}
            alt={data?.title}
            className="img-fluid rounded-quran mb-3"
            style={{ objectFit: "cover" }}
          />

          <h3 className="text-white fw-bold mb-3">{data?.title}</h3>
          <div className="d-flex">
            <div className="me-3">
              <div className="card-icon gradient-text">M</div>
            </div>
            <div>
              <h6 className="text-white gradient-text">Moon Stars Team</h6>
              <p>July 29, 2022</p>
            </div>
          </div>
          <p>{data?.description}</p>
          <p>{data?.content}</p>
        </div>
      </Container>
    </>
  );
};

export default DetailBlog;
