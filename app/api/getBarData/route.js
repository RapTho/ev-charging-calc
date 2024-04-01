import getData from "@/lib/getData";
import errorResponse from "@/lib/errorResponse";

const formatDate = (date) => {
  if (date) {
    const day = date.slice(8, 10);
    const month = date.slice(5, 7);

    return `${day}.${month}`;
  }
};

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return errorResponse(400, "Provide the 'start' and 'end' query parameter");
  } else {
    const data = await getData(start, end);

    if (!data) return Response.status(500);

    const barData = data.map((el) => {
      return { kWh: el.Consumption, date: formatDate(el.DateTime) };
    });

    return Response.json(barData, {
      status: 200,
    });
  }
}
