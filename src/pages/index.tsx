import React from 'react';
import Head from "next/head";
import Layout from "../_components/Layout";
import BigNumber from "../_components/BigNumber"


export default function Home() {
  return (
    <>
      <Head>
        <title>EV charger dashboard</title>
      </Head>
      <Layout>
        <BigNumber />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  // fetch

  return { props: { } };
}
