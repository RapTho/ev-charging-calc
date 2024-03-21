"use client";

import { Grid, Column } from "@carbon/react";
import getTotalkWh from "@/app/lib/getTotalkWh";

export default function BigNumber() {
  const START = process.env.START || Date.parse("February 22, 2024 14:00:00");
  const END = process.env.END || Date.now();

  const date = new Date();
  const timeNow = date
    .toLocaleString("de-CH", { timeZone: "CET" })
    .slice(0, -3); // remove seconds

  const totalConsumption = getTotalkWh(START, END).then((data) =>
    data.toFixed(2)
  );
  return (
    <Grid>
      <Column lg={16} md={8} sm={4} className="bigNumber">
        <h1>Consumption: {totalConsumption} kWh</h1>
        <p>As of {timeNow}</p>
      </Column>
    </Grid>
  );
}
