import { Container, Row, Col, Media } from "reactstrap";
import "./Fatality.css";
import React, { useState, useEffect } from "react";
import DonutChart from "./Donut";

const computePercentages = (data) => {
  const total = data.reduce((acc, curr) => acc + curr.Count, 0);
  return data.map((item) => ({
    ...item,
    percent: ((item.Count / total) * 100).toFixed(2),
  }));
};

const Fatality = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "http://localhost:8003/severity";

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

  const colors = ["title-green", "title-orange", "title-red"];

  const donutColors = [
    "donut-segment-1",
    "donut-segment-2",
    "donut-segment-3",
    "donut-segment-4",
    // Add more colors if needed
  ];

  return (
    <Container>
      <h1 className="infographic__title">Severity Percentages</h1>
      <Row className="infographic__grid">
        {percentages.map((item, index) => (
          <Col sm="4" className="infographic__grid__item" key={index}>
            <DonutChart
              percentage={parseFloat(item.percent)} // Parse the string to float
              color={donutColors[index % donutColors.length]}
              data={item.Value}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Fatality;
