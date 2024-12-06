export type Airport = {
  id: string;
  iata_code: string;
  icao_code: string;
  code: string;
  name: string;
  lat: number,
  lng: number,
};

export type AirportList = Airport[];
