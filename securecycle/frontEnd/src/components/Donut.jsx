import React from "react";
import "./Donut.css";

const DonutChart = ({ percentage, color, data }) => {
  const strokeValue = `${percentage}, ${100 - percentage}`;
  const animationName =
    color === "donut-segment-2"
      ? "donut1"
      : color === "donut-segment-3"
      ? "donut2"
      : color === "donut-segment-4"
      ? "donut3"
      : null;

  return (
    <div className="svg-item">
      <svg viewBox="0 0 40 40" className="donut">
        <circle
          className="donut-hole"
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="#fff"
        />
        <circle
          className="donut-ring"
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="transparent"
          strokeWidth="3.5"
        />
        <circle
          className={`donut-segment ${color}`}
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="transparent"
          strokeWidth="3.5"
          strokeDasharray={strokeValue}
          strokeDashoffset="25"
          style={animationName ? { animation: `${animationName} 3s` } : {}}
        />
        <g className={`donut-text ${color}-text`}>
          <text y="50%" transform="translate(0, 2)">
            <tspan x="50%" textAnchor="middle" className="donut-percent">
              {percentage}%
            </tspan>
          </text>
          <text y="60%" transform="translate(0, 2)">
            <tspan x="50%" textAnchor="middle" className="donut-data">
              {data}
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default DonutChart;
