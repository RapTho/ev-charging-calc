import React from "react";
import Link from "next/link";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <nav className={styles.navContainer}>
      <ul>
        <li className={styles.navItem}>
          <Link href="/settings">Settings</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
