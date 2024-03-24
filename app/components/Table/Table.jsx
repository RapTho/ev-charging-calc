import getTableData from "@/lib/getTableData";

import styles from "./Table.module.scss";

export default async function Table() {
  const start = process.env.START || Date.parse("February 22, 2024 14:00:00");
  const end = process.env.END || Date.now();

  const data = await getTableData(start, end);

  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr>
          <th className={styles.dateCol}>Date</th>
          <th className={styles.kWhCol}>Consumption</th>
        </tr>
      </thead>
      <tbody>
        {data.map((elem, index) => {
          return (
            <tr key={index} className={styles.row}>
              <td className={styles.dateCol}>{elem.DateTime}</td>
              <td className={styles.kWhCol}>{elem.Consumption} kWh</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
