import DistanceCalculator from "@/components/distance-calculator";

export default async function Home() {
  return (
    <div className="grid grid-rows-[4px_1fr_4px] md:grid-rows-[8px_1fr_8px] lg:grid-rows-[12px_1fr_12px] items-start lg:items-center justify-items-center min-h-screen p-2 pb-10 lg:pb-20 gap-0 gap-x-2 sm:gap-2 lg:gap-16 lg:gap-x-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-0 sm:gap-2 lg:gap-8 row-start-2 items-center sm:items-start w-full lg:w-3/4">
        <h1 className="text-3xl">USA Airport distance calculator</h1>
        <DistanceCalculator />
      </main>
    </div>
  );
}
