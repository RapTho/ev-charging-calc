import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import getData from "@/lib/getData";
import errorResponse from "@/lib/errorResponse";

export async function GET(request: NextRequest) {
  const start = request.nextUrl.searchParams.get("start");
  const end = request.nextUrl.searchParams.get("end");

  let authString = headers().get("Authorization");

  // Load environment variables for local development
  if (process.env.NODE_ENV === "development") {
    try {
      const dotenv = await import("dotenv");
      dotenv.config();
    } catch (err) {
      console.error("Failed to load dotenv:", err);
    }
  }

  if (!authString || authString == "null") {
    const username = process.env.UN;
    const password = process.env.PW;

    if (!username || !password) {
      throw new Error("Both UN and PW environment variables must be set.");
    }

    authString = `Basic ${Buffer.from(`${username}:${password}`).toString(
      "base64"
    )}`;
  }

  if (!start || !end) {
    return errorResponse(
      400,
      "Provide both 'start' and 'end' query parameters"
    );
  }

  try {
    const data = await getData(parseInt(start), parseInt(end), authString);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return errorResponse(500, "Failed to fetch data");
  }
}
