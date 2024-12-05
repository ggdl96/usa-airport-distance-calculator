import DistanceCalculator from "@/components/distance-calculator";
import { AirportList } from "@/types/airport";

const a = {
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
};
export default async function Home() {
  const airportList: AirportList = a.airports.map((item) => ({
    code: item.iata,
    name: item.name,
  }));

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-3/4">
        <h1 className="text-3xl">USA Airport distance calculator</h1>
        <DistanceCalculator airportList={airportList} />
      </main>
    </div>
  );
}
