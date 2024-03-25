"use server";

export const fetchData = async (start, end) => {
  // For local development only
  if (process.env.NODE_ENV === "dev") require("dotenv").config();

  const authString = `Basic ${Buffer.from(
    `${process.env.UN}:${process.env.PW}`
  ).toString("base64")}`;

  const endpoint =
    `${process.env.URL}/api/Chargings/History?` +
    new URLSearchParams({
      from: parseInt(start / 1000),
      to: parseInt(end / 1000),
      type: "driver",
    });

  const options = {
    method: "GET",
    headers: {
      Authorization: authString,
    },
  };

  if (!process.env.URL) return;

  const r = await fetch(endpoint, options);

  if (!r.ok) {
    console.error(`Endpoint: ${endpoint}`);
    throw "Failed to fetch data";
  }
  return await r.json();
};

const getTotalkWh = async (start, end) => {
  const data = await fetchData(start, end);

  return data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.Consumption,
    0
  );
};

export default getTotalkWh;
