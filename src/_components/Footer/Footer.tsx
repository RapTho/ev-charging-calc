import Link from "next/link";
import { Grid, Column } from "@carbon/react";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <Grid>
      <Column lg={16} md={8} sm={4} className={styles.footer}>
        Developed by{" "}
        <Link href="https://linkedin.com/in/raphael-tholl">Raphael Tholl</Link>
      </Column>
    </Grid>
  );
}
