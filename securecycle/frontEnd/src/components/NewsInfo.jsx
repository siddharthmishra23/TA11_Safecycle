import React from "react";
import "animate.css/animate.min.css";
import "./NewsInfo.css";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

const NewsInfo = ({ news }) => {
  return (
    <Card className="animate__animated animate__fadeIn">
      <CardImg
        top
        src={news.posterImage}
        alt={news.title}
        className="poster animate__animated animate__fadeInDownBig"
      />
      <CardBody className="details animate__animated animate__fadeInUpBig">
        <CardTitle tag="h1">{news.title}</CardTitle>
        <CardText className="desc">{news.description}</CardText>
        <Link to={news.ref}>
          <Button>Learn More</Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default NewsInfo;
