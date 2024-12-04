import DistanceCalculator from "@/components/distance-calculator";
import apca from "@/services/airport-codes";
import { AirportList } from "@/types/airport";

export default async function Home() {
  const airportList: AirportList = [
    {
      code: "SA",
      name: "SA SA AS (SA)"
    },
    {
      code: "SA2",
      name: "SA2 2s (SA2)"
    },
    {
      code: "SA3",
      name: "SA3 ese (SA3)"
    },
    {
      code: "SA4",
      name: "SA 4 4 4 (SA4)"
    },
  ];

  try {
    const a = apca.request('new yo')
  } catch (error) {
    console.error('error', error);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl">USA Airport distance calculator</h1>
        <DistanceCalculator airportList={airportList} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/ggdl96/usa-airport-distance-calculator"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </footer>
    </div>
  );
}
