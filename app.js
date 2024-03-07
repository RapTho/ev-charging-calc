const START = process.env.START || Date.parse("February 22, 2024 14:00:00");
const END = process.env.END || Date.now() ;

// For local development only
if (process.env.NODE_ENV === "dev") require("dotenv").config();

const getData = async (FROM, TO) => {
  const authString = `Basic ${Buffer.from(`${process.env.UN}:${process.env.PW}`).toString("base64")}`;

  const endpoint =
    `${process.env.URL}/api/Chargings/History?` +
    new URLSearchParams({
      from: parseInt(FROM / 1000),
      to: parseInt(TO / 1000),
      type: "driver",
    });

  const options = {
    method: "GET",
    headers: {
      Authorization: authString,
    },
  };

  const r = await fetch(endpoint, options);

  if (r.ok) {
    return await r.json();
  } else {
    throw "Failed to fetch data";
  }
};

getData(START, END)
  .then((data) => {
    const kWhSum = data.reduce((accumulator, currentValue) => accumulator + currentValue.Consumption,0);

    console.log(`Consumption in kWh: ${kWhSum}\nFrom: ${new Date(START).toISOString()}\nTo: ${new Date(END).toISOString()}\n`);
  })
  .catch((err) => console.error(err));
