import Head from "next/head";
import { Content, Theme } from "@carbon/react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type TLayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: TLayoutProps) {
  const defaultTitle = "Coffee recipes";
  return (
    <>
      <Head>
        <meta
          name="description"
          content="App to display the consumed kWh"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={defaultTitle} />
      </Head>
      <Theme theme="white">
        <Header />
      </Theme>
        <Content>{children}</Content>
      <Footer />
    </>
  );
}
