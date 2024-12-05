import { AirlabsResponseSchema } from "@/schemas/airlabs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  if (!search) {
    return NextResponse.json({ message: "search parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(process.env.AIRLABS_API + `?country_code=${process.env.COUNTRY_CODE}&api_key=${process.env.AIRLABS_API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    const parsedResponse = AirlabsResponseSchema.parse(data);

    parsedResponse.response = parsedResponse.response.filter(item => item.iata_code !== null || item.icao_code !== null);
    return NextResponse.json(parsedResponse, { status: 200 });
  } catch (error) {
    console.error('error: ', (error as Error).message);
    return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
  }
}
