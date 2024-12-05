import { SelectOptionList } from "@/types/select";

export const getNameFromAirportCode = (
  airportList: SelectOptionList,
  airportCode: string
) => airportList.find((airport) => airport.value === airportCode)?.label ?? "";
