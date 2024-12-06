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
      const code =  airport.iata_code ?? airport.icao_code ?? "";
      uniqueAirports.add(id);
      list.push({
        code,
        name: `${code} - ${airport.name}`,
        id,
        iata_code: airport.iata_code ?? "",
        icao_code: airport.icao_code ?? "",
        lat: airport.lat,
        lng: airport.lng,
      });
    }
  }

  return list;
};
