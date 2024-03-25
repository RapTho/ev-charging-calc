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

import getTableData from "@/lib/getTableData";

const getBarChartData = async (start, end) => {
  const data = await getTableData(start, end);

  const barData = data.map((el) => {
    return { kWh: el.Consumption, date: el.DateTime };
  });
  console.log(barData);
  return barData;
};

const start = process.env.START || Date.parse("February 22, 2024 14:00:00");
const end = process.env.END || Date.now();

export default class BarChartComponent extends PureComponent {
  async render() {
    return (
      <ResponsiveContainer minWidth="100%" minHeight="300px">
        <BarChart
          width={500}
          height={300}
          data={await getBarChartData(start, end)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
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
