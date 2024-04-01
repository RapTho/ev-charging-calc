import React from "react";
import Link from "next/link";

import Logo from "@/components/Logo";
import ModeToggle from "@/components/ModeToggle";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.navContainer}>
          <nav>
            <ul>
              <li className={styles.navItem}>
                <Link href="/settings">Settings</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.modeToggle}>
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
