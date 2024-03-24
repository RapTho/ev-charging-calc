import dynamic from "next/dynamic";

const BigNumber = dynamic(() => import("./components/BigNumber"), {
  ssr: false,
});
const Table = dynamic(() => import("./components/Table"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <BigNumber />
      <Table />
    </main>
  );
}
