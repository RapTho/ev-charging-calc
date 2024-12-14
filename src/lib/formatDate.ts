import { dateFormats } from "src/types";

export default function formatDate(date, format) {
  const day = date.slice(8, 10);
  const month = date.slice(5, 7);
  const year = date.slice(0, 4);

  let dateString = "";
  switch (format) {
    case dateFormats.ddmm:
      dateString = `${day}.${month}`;
      break;
    case dateFormats.ddmmyyyy:
      dateString = `${day}.${month}.${year}`;
    default:
      break;
  }

  return dateString;
}
