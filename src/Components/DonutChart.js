// src/Components/DonutChart.js
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DonutChart = ({ data, title, color }) => {
  const remainder = 100 - data[0].value;

  const chartData = [
    { name: "value", value: data[0].value },
    { name: "remainder", value: remainder },
  ];

  const COLORS = [color || "#FF6767", "#f0f0f0"];

  return (
    <div style={{ textAlign: "center", margin: "20px", width: "120px" }}>
      <h6 style={{ fontSize: "14px" }}>{title}</h6>
      <ResponsiveContainer width={120} height={120}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={50}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <p style={{ fontWeight: "bold", margin: 0 }}>{data[0].value}</p>
    </div>
  );
};

export default DonutChart;
