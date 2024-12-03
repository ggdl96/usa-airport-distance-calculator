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
      setFromOptions(airportList.filter(item => item.code !== toSelected).map((item) => ({
        value: item.code,
        label: item.name,
      })))

      setToOptions(airportList.filter(item => item.code !== fromSelected).map((item) => ({
        value: item.code,
        label: item.name,
      })))
    }
  }, [airportList, fromSelected, toSelected])

  useEffect(() => {
    if (fromSelected && toSelected) {
      // TODO IMPROVE, THIS IS FOR TESTING PURPOSES
      setDistanceInMiles(212);
    }
  }, [fromSelected, toSelected]);

  return (
    <div>
      <div className="w-full pb-2 pt-2">
        <SearchInput
          options={fromOptions}
          onSelect={function (value: string): void {
            setFromSelected(value);
          }}
          selectedValue={fromSelected}
        />
      </div>
      <div className="w-full pb-8 pt-2">
        <SearchInput
          options={toOptions}
          onSelect={function (value: string): void {
            setToSelected(value);
          }}
          selectedValue={toSelected}
        />
      </div>
      {distanceInMiles ? (
        <>
          <h2>Distance in nautic miles</h2>
          <p>{distanceInMiles}</p>
        </>
      ) : null}
    </div>
  );
}
