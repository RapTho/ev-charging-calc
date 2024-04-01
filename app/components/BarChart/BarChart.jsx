"use client";

import React, { useEffect, useState, PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

class BarChartClass extends PureComponent {
  render(data) {
    return (
      <ResponsiveContainer minWidth="100%" minHeight="300px">
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit=" kWh" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="kWh"
            fill="#2f55b5"
            activeBar={<Rectangle fill="#4ccc2c" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

const start = process.env.START || Date.parse("February 22, 2024 14:00:00");
const end = process.env.END || Date.now();

export default function BarChartComponent() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/getBarData/?start=${encodeURI(start)}&end=${encodeURI(end)}`
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    };

    fetchData();
  }, [start, end]);

  const [data, setData] = useState({});

  const component = new BarChartClass();
  return component.render(data);
}
