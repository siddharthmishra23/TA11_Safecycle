import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const [chartData, setChartData] = useState(null);

  const colors = [
    "rgba(255, 99, 132)",
    "rgba(54, 162, 235)",
    "rgba(255, 206, 86)",
    "rgba(75, 192, 192)",
    "rgba(153, 102, 255)",
    "rgba(255, 159, 64)",
    "rgba(201, 203, 207)",
  ];

  const borderColors = colors.map((color) => color.replace("0.2", "1"));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/CarType`);
        const data = await response.json();

        const labels = data.data.map((item) => item.vehicle_type);
        const chartDataValues = data.data.map((item) => item.count);

        //const backgroundColors = labels.map((_, index) => colors[index % 7]);
        const borderColorValues = labels.map(
          (_, index) => borderColors[index % 7]
        );

        const backgroundColors = data.data.map((item) => {
          return item.vehicle_type === "Bicycle" ? "#2417AD" : "#1EB0EA";
        });

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Number of Accidents",
              data: chartDataValues,
              backgroundColor: backgroundColors,
              // borderColor: borderColorValues,
              // borderWidth: 1,
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
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default BarChart;
