export default function formatDate(date, format) {
  const day = date.slice(8, 10);
  const month = date.slice(5, 7);
  const year = date.slice(0, 4);

  let dateString = "";
  switch (format) {
    case "DD.MM":
      dateString = `${day}.${month}`;
      break;
    case "DD.MM.YYYY":
      dateString = `${day}.${month}.${year}`;
    default:
      break;
  }

  return dateString;
}
