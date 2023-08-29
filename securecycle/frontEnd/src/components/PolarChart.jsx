import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PolarChart() {
  const [chartData, setChartData] = useState(null);

  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(201, 203, 207, 0.2)",
  ];

  const borderColors = colors.map((color) => color.replace("0.2", "1"));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8003/accidentTime`);
        const data = await response.json();

        const labels = data.data.map((item) => item.Value);
        const chartDataValues = data.data.map((item) => item.Count);

        const backgroundColors = labels.map((_, index) => colors[index % 7]);
        const borderColorValues = labels.map(
          (_, index) => borderColors[index % 7]
        );

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Number of Accidents",
              data: chartDataValues,
              backgroundColor: backgroundColors,
              borderColor: borderColorValues,
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching the chart data:", error);
      }
    }

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {
      enabled: false,
    },
  };
  return <Pie data={chartData} options={options} />;
}

export default PolarChart;
