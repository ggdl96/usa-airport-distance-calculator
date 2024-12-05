import { AirlabsResponseSchema } from "@/schemas/airlabs";
import { AirportList } from "@/types/airport";

export const transformToAirports = (response: unknown): AirportList => {
  const parsedResponse = AirlabsResponseSchema.parse(response);
  const uniqueAirports = new Set<string>();
  const list: AirportList = [];
  for (const airport of parsedResponse.response) {
    const id = `${airport.name}-${airport.iata_code ?? ""}-${
      airport.icao_code ?? ""
    }`;

    if (!uniqueAirports.has(id)) {
      uniqueAirports.add(id);
      list.push({
        code: airport.iata_code ?? airport.icao_code ?? "",
        name: airport.name,
        id,
        iata_code: airport.iata_code ?? "",
        icao_code: airport.icao_code ?? "",
      });
    }
  }

  return list;
};
