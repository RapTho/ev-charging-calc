import { Grid, Column } from "@carbon/react";
import styles from "./BigNumber.module.scss";

type Data = {
    kWh: number
}

export default function BigNumber({ data }: Data) {
  return (
    <Grid>
      <Column lg={16} md={8} sm={4} className={styles.bigNumber}>
        <h1>Consumed: 15 kWh</h1>
      </Column>
    </Grid>
  );
};
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
  //   const data: Data = await res.json()
    const data: Data = { kWh: 15}
    return { props: { data: data } }
}
