import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import getData from "lib/getData";
import errorResponse from "src/lib/errorResponse";

export async function GET(request: NextRequest) {
  const start = request.nextUrl.searchParams.get("start");
  const end = request.nextUrl.searchParams.get("end");

  const authString = headers().get("Authorization");
  if (!authString || !authString.startsWith("Basic ")) {
    return errorResponse(401, "Please authenticate first");
  }

  if (!start || !end) {
    return errorResponse(
      400,
      "Provide both 'start' and 'end' query parameters"
    );
  }

  try {
    const data = await getData(start, end, authString);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return errorResponse(500, "Failed to fetch data");
  }
}
