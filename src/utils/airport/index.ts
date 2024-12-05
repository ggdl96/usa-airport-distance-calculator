import { AirportList } from "@/types/airport";

export const getNameFromAirportCode = (
  airportList: AirportList,
  airportCode: string
) => airportList.find((airport) => airport.code === airportCode)?.name ?? "";
