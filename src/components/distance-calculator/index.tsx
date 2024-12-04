"use client";

import SearchInput from "@/components/search-input";
import { AirportList } from "@/types/airport";
import { SelectOptionList } from "@/types/select";
import { useEffect, useState } from "react";

interface Props {
  airportList: AirportList;
}

export default function DistanceCalculator({ airportList }: Props) {
  const [fromOptions, setFromOptions] = useState<SelectOptionList>([]);
  const [toOptions, setToOptions] = useState<SelectOptionList>([]);

  const [fromSelected, setFromSelected] = useState("");
  const [toSelected, setToSelected] = useState("");

  const [distanceInMiles, setDistanceInMiles] = useState(0);

  useEffect(() => {
    if (airportList.length) {
      setFromOptions(
        airportList
          .filter((item) => item.code !== toSelected)
          .map((item) => ({
            value: item.code,
            label: item.name,
          }))
      );

      setToOptions(
        airportList
          .filter((item) => item.code !== fromSelected)
          .map((item) => ({
            value: item.code,
            label: item.name,
          }))
      );
    }
  }, [airportList, fromSelected, toSelected]);

  useEffect(() => {
    if (fromSelected && toSelected) {
      // TODO IMPROVE, THIS IS FOR TESTING PURPOSES
      setDistanceInMiles(212);
    }
  }, [fromSelected, toSelected]);

  return (
    <div className="flex flex-col justify-center items-center bg-background-form rounded-md shadow-background-form shadow-md">
      <div className="flex flex-col sm:flex-row pb-4">
        <div className="w-full p-2">
          <SearchInput
            options={fromOptions}
            onSelect={function (value: string): void {
              setFromSelected(value);
            }}
            selectedValue={fromSelected}
          />
        </div>
        <div className="w-full p-2">
          <SearchInput
            options={toOptions}
            onSelect={function (value: string): void {
              setToSelected(value);
            }}
            selectedValue={toSelected}
          />
        </div>
      </div>
      {distanceInMiles ? (
        <>
          <h2 className="text-lg">Distance:</h2>
          <p className="text-xl font-bold">{`${distanceInMiles} nautic mile${
            distanceInMiles === 1 ? "" : "s"
          }`}</p>
        </>
      ) : null}
    </div>
  );
}
