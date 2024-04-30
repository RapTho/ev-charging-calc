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

    if (!data) return Response.json({error: "Failed to fetch data"}, {status: 500});

    return Response.json(data, {
      status: 200,
    });
  }
}
