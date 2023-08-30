import React from "react";
import "./Donut.css";

const DonutChart = ({ percentage, color, data }) => (
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
        stroke-width="3.5"
      />
      <circle
        className={`donut-segment ${color}`}
        cx="20"
        cy="20"
        r="15.91549430918954"
        fill="transparent"
        stroke-width="3.5"
        stroke-dasharray={`${percentage} ${100 - percentage}`}
        stroke-dashoffset="25"
      />
      <g className={`donut-text ${color}-text`}>
        <text y="50%" transform="translate(0, 2)">
          <tspan
            x="50%"
            text-anchor="middle"
            className="donut-percent"
          >{`${percentage}`}</tspan>
        </text>
        <text y="60%" transform="translate(0, 2)">
          <tspan x="50%" text-anchor="middle" className="donut-data">
            {data}
          </tspan>
        </text>
      </g>
    </svg>
  </div>
);

export default DonutChart;
