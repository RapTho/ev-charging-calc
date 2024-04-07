"use client";

import React, { PureComponent } from "react";
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

import formatDate from "@/lib/formatDate";

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
          <XAxis dataKey="DateTime" />
          <YAxis unit="kWh" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="kWh"
            fill="black"
            activeBar={<Rectangle fill="black" stroke="black" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default function BarChartComponent({ data }) {
  if (!data || data.length === 0) return;

  data = data.map((el) => {
    return {
      kWh: el.Consumption,
      DateTime: formatDate(el.DateTime, "DD.MM"),
    };
  });
  const component = new BarChartClass();
  return component.render(data);
}
