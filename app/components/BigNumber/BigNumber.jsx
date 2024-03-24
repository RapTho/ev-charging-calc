import getTotalkWh from "@/app/lib/getTotalkWh";

export default async function BigNumber() {
  const start = process.env.START || Date.parse("February 22, 2024 14:00:00");
  const end = process.env.END || Date.now();

  const totalConsumption = await getTotalkWh(start, end);

  return (
    <>
      <h1>Consumption: {totalConsumption.toFixed(2)} kWh</h1>
      <h2>@ 0.3 CHF/kWh = {(totalConsumption * 0.3).toFixed(2)} CHF</h2>
    </>
  );
}
