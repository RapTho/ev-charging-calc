import { headers } from "next/headers";

import getData from "@/lib/getData";
import errorResponse from "@/lib/errorResponse";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const headersList = headers();
  const authString = headersList.get("Authorization");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return errorResponse(400, "Provide the 'start' and 'end' query parameter");
  } else if (!authString || authString.slice(0, 5) !== "Basic") {
    return errorResponse(401, "Please authenticate first");
  } else {
    const data = await getData(start, end, authString);

    if (!data) return Response.status(500);

    return Response.json(data, {
      status: 200,
    });
  }
}
