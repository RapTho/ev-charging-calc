import getTableData from "@/lib/getTableData";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function RecentCharges() {
  const start = process.env.START || Date.parse("February 22, 2024 14:00:00");
  const end = process.env.END || Date.now();

  const data = await getTableData(start, end);

  return (
    <Table>
      <TableCaption>A list of your recent charges.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead className="text-right">Amount [kWh]</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((elem, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{elem.DateTime}</TableCell>
              <TableCell className="text-right">{elem.Consumption}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
