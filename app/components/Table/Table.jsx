import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import formatDate from "@/lib/formatDate";

export default async function RecentCharges({ data }) {
  const comopnent = !data ? (
    <p className="text-xs text-muted-foreground">Loading...</p>
  ) : (
    <Table>
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
              <TableCell>{formatDate(elem.DateTime, "DD.MM.YYYY")}</TableCell>
              <TableCell className="text-right">{elem.Consumption}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );

  return comopnent;
}
