import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PolarChart() {
  const [chartData, setChartData] = useState(null);

  // const colors = [
  //   "rgba(255, 99, 132)",
  //   "rgba(54, 162, 235)",
  //   "rgba(255, 206, 86)",
  //   "rgba(75, 192, 192)",
  //   "rgba(153, 102, 255)",
  //   "rgba(255, 159, 64)",
  //   "rgba(201, 203, 207)",
  // ];
  const colors = [
    "#63ADF2",
    "#545E75",
    "#A7CCED",
    "#304D6D",
    "#82A0BC",
  ];


  const borderColors = colors.map((color) => color.replace("0.2", "1"));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8003/accidentTime`);
        const data = await response.json();

        const labels = data.data.map((item) => item.survey_year);
        const chartDataValues = data.data.map((item) => item.bike_percent);

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
              borderWidth: 3,
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
      title: {display: true, text: 'Percentage of Bikes as Vehicle Travelling into City Central at 7-10am', font:{size:20}, padding:{bottom:20}},
      legend: {
        display: false,
      },
    },
    // tooltip: {
    //   enabled: false,
    //   callbacks: {
    //     label: "Accidents"
    //   }
    // },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Survey Year',
          color: 'black', // Optionally style the font color
          font: {
              size: 12     // Optionally set the font size
          },
        beginAtZero: true,
        grid: {
          display: false,
        },
      }},
      y: {
        title: {
          display: true,
          text: 'Percentage of Bikes',
          color: 'black', // Optionally style the font color
          font: {
              size: 12     // Optionally set the font size
          },
        grid: {
          display: false,
        },
      },
    },
  }
  };
  return <Line data={chartData} options={options} />;
}

export default PolarChart;
