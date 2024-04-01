"use client";

import React, { useEffect, useState } from "react";

export default function BigNumber() {
  const start = process.env.START || Date.parse("February 22, 2024 14:00:00");
  const end = process.env.END || Date.now();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/getTotalkWh/?start=${encodeURI(start)}&end=${encodeURI(end)}`
      );
      if (response.ok) {
        const data = await response.json();
        setkWh(data.kWh.toFixed(2));
      }
    };

    fetchData();
  }, [start, end]);

  const [kWh, setkWh] = useState(0);

  return (
    <>
      <h1>Consumption: {kWh} kWh</h1>
      <h2>@ 0.3 CHF/kWh = {(kWh * 0.3).toFixed(2)} CHF</h2>
    </>
  );
}
