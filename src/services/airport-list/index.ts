import { transformToAirports } from "@/mappers/airport-codes";
import { AirportList } from "@/types/airport";

const data = {
  airports: [
    {
      name: "Lakefront Airport",
      city: "New Orleans",
      iata: "NEW",
      country: {
        name: "United States",
        iso: "US",
      },
      state: {
        name: "Louisiana",
        abbr: "LA",
      },
    },
    {
      name: "New York City - All Airports",
      city: "New York City",
      iata: "NYC",
      children: [
        {
          name: "John F. Kennedy International Airport",
          city: "New York City",
          iata: "JFK",
          state: {
            name: "New York",
            abbr: "NY",
          },
        },
        {
          name: "Newark Liberty International Airport",
          city: "Newark",
          iata: "EWR",
          state: {
            name: "New Jersey",
            abbr: "NJ",
          },
        },
        {
          name: "LaGuardia Airport",
          city: "New York City",
          iata: "LGA",
          state: {
            name: "New York",
            abbr: "NY",
          },
        },
        {
          name: "Long Island MacArthur Airport",
          city: "Ronkonkoma",
          iata: "ISP",
          state: {
            name: "New York",
            abbr: "NY",
          },
        },
        {
          name: "Westchester County Airport",
          city: "White Plains",
          iata: "HPN",
          state: {
            name: "New York",
            abbr: "NY",
          },
        },
      ],
      country: {
        name: "United States",
        iso: "US",
      },
      state: {
        name: "New York",
        abbr: "NY",
      },
    },
    {
      name: "New Chitose Airport",
      city: "Sapporo",
      iata: "CTS",
      country: {
        name: "Japan",
        iso: "JP",
      },
      state: {
        name: "Hokkaidō (北海道)",
        abbr: null,
      },
    },
    {
      name: "La Tontouta International Airport",
      city: "Noumea",
      iata: "NOU",
      country: {
        name: "New Caledonia",
        iso: "NC",
      },
      state: {
        name: "South Province",
        abbr: null,
      },
    },
    {
      name: "Los Angeles International Airport",
      city: "Los Angeles",
      iata: "LAX",
      country: {
        name: "United States",
        iso: "US",
      },
      state: {
        name: "California",
        abbr: "CA",
      },
    },
    {
      name: "Ontario International Airport",
      city: "Ontario",
      iata: "ONT",
      country: {
        name: "United States",
        iso: "US",
      },
      state: {
        name: "California",
        abbr: "CA",
      },
    },
    {
      name: "Bahía de los Ángeles Airport",
      city: "Bahía de los Ángeles",
      iata: "BHL",
      country: {
        name: "Mexico",
        iso: "MX",
      },
      state: {
        name: "Baja California",
        abbr: "BC",
      },
    },
    {
      name: "Van Nuys Airport",
      city: "Los Angeles",
      iata: "VNY",
      country: {
        name: "United States",
        iso: "US",
      },
      state: {
        name: "California",
        abbr: "CA",
      },
    },
    {
      name: "Whiteman Airport",
      city: "Los Angeles",
      iata: "WHP",
      country: {
        name: "United States",
        iso: "US",
      },
      state: {
        name: "California",
        abbr: "CA",
      },
    },
  ],
  term: "new",
  limit: "10",
  size: 0,
  cached: false,
  status: true,
  statusCode: 200,
} as const;

export function getList(term: string): Promise<AirportList> {
  const promise: Promise<AirportList> = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const response = transformToAirports(data).filter(
          (item) =>
            item.name.toLowerCase().includes(term.toLowerCase()) ||
            item.code.toLowerCase().includes(term.toLowerCase())
        );
        resolve(response);
      } catch (error) {
        console.error('error get list: ', error);
        reject(reject);
      }
    }, 2000);
  });

  return promise;
}
