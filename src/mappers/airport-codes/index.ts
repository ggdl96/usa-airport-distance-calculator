import { AutoCompleteResponseSchema } from "@/schemas/airport-codes";
import { AirportList } from "@/types/airport";

export const transformToAirports = (response: unknown): AirportList => {
    const parsedResponse = AutoCompleteResponseSchema.parse(response);
  
    const airports = parsedResponse.airports.map((airport) => ({
      code: airport.iata,
      name: airport.name,
    }));
  
    return airports;
  };