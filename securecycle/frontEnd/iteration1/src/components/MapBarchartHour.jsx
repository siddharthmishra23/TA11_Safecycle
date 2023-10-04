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

function MapBarhartHour() {
  const [chartData, setChartData] = useState(null);
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = daysOfTheWeek[new Date().getDay()];
  const [selectedOption, setSelectedOption] = useState(currentDay); // Initialize with current day string
  //const [selectedOption, setSelectedOption] = useState(new Date().getDay());  // Initialize with current day

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
    async function fetchData(day) {
      try {
        const response = await fetch(`/accidentHour?day=${day}`);
        const data = await response.json();

        const labels = data.data.map((item) => item.LABEL);
        const chartDataValues = data.data.map((item) => item.COUNT);

        // const backgroundColors = labels.map((_, index) => colors[index % 7]);
        const borderColorValues = labels.map(
          (_, index) => borderColors[index % 7]
        );
        // Get the current hour
        const currentHour = new Date().getHours();
        //const currentDay = new Date().getDay();

        // Create an array of colors, setting the current hour's color to red
        const backgroundColors = [];
        for (let i = 0; i < 24; i++) {
          if (i === currentHour) {
            backgroundColors.push("#2417AD");
          } else {
            backgroundColors.push("#1EB0EA");
          }
        }

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "No of Accidents: ",
              data: chartDataValues,
              backgroundColor: backgroundColors,
              //borderColor: borderColorValues,
              //borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching the chart data:", error);
      }
    }

    // Call fetchData with the initially set day
    fetchData(selectedOption);
  }, [selectedOption]); // Fetch data whenever selectedOption changes

  const handleDayChange = (e) => {
    setSelectedOption(e.target.value);
  };
  if (!chartData) {
    return <div>Loading...</div>;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Number of Bike Accidents by Time of the Day",
        font: { size: 20 },
        padding: { bottom: 20 },
      },
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
      y: {
        title: {
          display: true,
          text: "No of Accidents",
          color: "black", // Optionally style the font color
          font: {
            size: 12, // Optionally set the font size
          },
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Time of day",
          color: "black", // Optionally style the font color
          font: {
            size: 12, // Optionally set the font size
          },
          grid: {
            display: false,
          },
        },
      },
    },
  };

  return (
    <div
      class="chart-container"
      style={{
        height: "300px",
      }}
    >
      Current data:&#160;&#160;&#160;
      <select value={selectedOption} onChange={handleDayChange}>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default MapBarhartHour;
