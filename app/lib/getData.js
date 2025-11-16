const { getConfig } = require("./config");

export const getData = async (start, end) => {
  const cfg = getConfig();

  const endpoint =
    `${cfg.DATA_URL}/api/Chargings/History?` +
    new URLSearchParams({
      from: parseInt(start / 1000),
      to: parseInt(end / 1000),
      type: "driver",
    });

  const options = {
    method: "GET",
    headers: {
      Authorization: cfg.AUTH,
    },
  };

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
