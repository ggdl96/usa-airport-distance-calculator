import { AutoCompleteResponseSchema } from "@/schemas/airport-codes";
import { AirportList } from "@/types/airport";

export const transformToAirports = (response: unknown): AirportList => {
    const parsedResponse = AutoCompleteResponseSchema.parse(response);
  
    const airports: AirportList = parsedResponse.airports.map((airport) => ({
      code: airport.iata,
      name: airport.name,
      id: airport.iata,
      iata_code: airport.iata,
      icao_code: '',
      lat: 0,
      lng: 0
    }));
  
    return airports;
  };