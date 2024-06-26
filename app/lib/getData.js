export const getData = async (start, end, authString) => {
  // For local development only
  if (process.env.NODE_ENV === "dev") require("dotenv").config();

  // const authString = `Basic ${Buffer.from(
  //   `${process.env.UN}:${process.env.PW}`
  // ).toString("base64")}`;

  const endpoint =
    `${process.env.DATA_URL}/api/Chargings/History?` +
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

  if (!process.env.DATA_URL) return;

  const r = await fetch(endpoint, options);

  if (!r.ok) {
    throw "Failed to fetch data";
  }
  const data = await r.json();
  return data.sort(function (a, b) {
    return new Date(b.DateTime) - new Date(a.DateTime);
  });
};

export default getData;
