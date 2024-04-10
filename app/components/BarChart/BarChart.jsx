"use client";

import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import formatDate from "@/lib/formatDate";
import CustomTooltip from "@/components/CustomTooltip";

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default function BarChartComponent({ data }) {
  if (!data || data.length === 0) return;

  data = data.map((el) => {
    return {
      kWh: el.Consumption,
      DateTime: formatDate(el.DateTime, "DD.MM"),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3" vertical={false} />
        <XAxis
          dataKey="DateTime"
          tickLine={false}
          axisLine={false}
          stroke="#888888"
        />
        <YAxis unit=" kWh" axisLine={false} tickLine={false} stroke="#888888" />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="kWh"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          activeBar={<Rectangle fill="black" stroke="black" />}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
