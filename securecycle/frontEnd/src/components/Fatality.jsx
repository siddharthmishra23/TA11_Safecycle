import { Container, Row, Col, Media } from "reactstrap";
import "./Fatality.css";
import React, { useState, useEffect } from "react";

const computePercentages = (data) => {
  const total = data.reduce((acc, curr) => acc + curr.Count, 0);
  return data.map((item) => ({
    ...item,
    percent: ((item.Count / total) * 100).toFixed(2) + "%",
  }));
};

const Fatality = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "/severity";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const percentages = computePercentages(data);

  const colors = [
    "title-dkblue",
    "title-orange",
    "title-ltblue",
    "title-red",
    "title-green",
    "title-yellow",
  ];

  return (
    <Container>
      <h1 className="infographic__title">Severity Percentages</h1>
      <Row className="infographic__grid">
        {percentages.map((item, index) => (
          <Col sm="4" className="infographic__grid__item" key={index}>
            <Media
              middle
              src="" // Determine the image URL logic based on your requirements
              className="infographic__grid__item__img"
            />
            <h2
              className={`infographic__grid__item__title ${
                colors[index % colors.length]
              }`}
            >
              {item.percent}
            </h2>
            <p className="infographic__grid__item__p">{item.Value}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Fatality;
