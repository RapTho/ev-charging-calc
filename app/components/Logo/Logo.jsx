import Link from "next/link";
import Image from "next/image";

import logo from "@/../assets/logo.svg";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="EV charging dashboard" />
    </Link>
  );
}
