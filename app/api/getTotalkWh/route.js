import getData from "@/lib/getData";
import errorResponse from "@/lib/errorResponse";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return errorResponse(400, "Provide the 'start' and 'end' query parameter");
  } else {
    const data = await getData(start, end);

    if (!data) return Response.status(500);

    const total = data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.Consumption,
      0
    );

    return Response.json(
      { kWh: total },
      {
        status: 200,
      }
    );
  }
}
