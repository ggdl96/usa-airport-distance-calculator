import { AirlabsResponseSchema } from "@/schemas/airlabs";
import { AirportList } from "@/types/airport";

export const transformToAirports = (response: unknown): AirportList => {
    const parsedResponse = AirlabsResponseSchema.parse(response);
  
    const airports = parsedResponse.response.map((airport) => ({
      code: airport.iata_code ?? airport.icao_code ?? '',
      name: airport.name,
    }));
  
    return airports;
  };