"use client";

import SearchInput from "@/components/search-input";
import { AirportList } from "@/types/airport";
import { SelectOptionList } from "@/types/select";
import { useEffect, useState } from "react";
import MapDisplay from "../map-display";
import {
  caclculateDistanceBetweenTwoPoints,
  calculateCenterOfTwoCoordinates,
  kmsToMiles,
} from "@/utils/distance-calculator";
import useGoogleMaps from "@/hooks/useGoogleMaps";
import { Coordinates } from "@/types/Geo";
import { fetchCoordinates } from "@/utils/geo";

interface Props {
  airportList: AirportList;
}

export default function DistanceCalculator({ airportList }: Readonly<Props>) {
  const [fromOptions, setFromOptions] = useState<SelectOptionList>([]);
  const [toOptions, setToOptions] = useState<SelectOptionList>([]);

  const [fromSelected, setFromSelected] = useState("");
  const [toSelected, setToSelected] = useState("");

  const [coordinatesOrigin, setCoordinatesOrigin] =
    useState<Coordinates | null>();
  const [coordinatesDestination, setCoordinatesDestination] =
    useState<Coordinates | null>();
  const [distanceInMiles, setDistanceInMiles] = useState(0);

  const data = useGoogleMaps();

  useEffect(() => {
    if (data.isLoaded) {
      fetchCoordinates(
        airportList.find((airport) => airport.code === fromSelected)?.name ??
          "",
        (result, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (result) {
              setCoordinatesOrigin({
                lat: result[0].geometry.location.lat(),
                lng: result[0].geometry.location.lng(),
              });
            }
          }
        }
      );

      fetchCoordinates(
        airportList.find((airport) => airport.code === toSelected)?.name ?? "",
        (result, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (result) {
              setCoordinatesDestination({
                lat: result[0].geometry.location.lat(),
                lng: result[0].geometry.location.lng(),
              });
            }
          }
        }
      );
    }
  }, [airportList, data.isLoaded, fromSelected, toSelected]);

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
    if (coordinatesOrigin && coordinatesDestination) {
      const distance = caclculateDistanceBetweenTwoPoints(
        coordinatesOrigin,
        coordinatesDestination
      );
      setDistanceInMiles(kmsToMiles(distance));
    } else {
      setDistanceInMiles(0);
    }
  }, [coordinatesDestination, coordinatesOrigin]);

  useEffect(() => {
    const func = async () => {
      try {
      } catch (error) {
        console.error("error", error);
      }
    };

    func();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center bg-background-form rounded-md shadow-background-form shadow-md w-full">
      <div className="flex flex-col sm:flex-row pb-4 w-full">
        <div className="w-full sm:w-1/2 p-2">
          <SearchInput
            options={fromOptions}
            onSelect={function (value: string): void {
              setFromSelected(value);
            }}
            selectedValue={fromSelected}
            placeholder={"Search origin Airport..."}
          />
        </div>
        <div className="w-full sm:w-1/2 p-2">
          <SearchInput
            options={toOptions}
            onSelect={function (value: string): void {
              setToSelected(value);
            }}
            selectedValue={toSelected}
            placeholder={"Search destination Airport..."}
          />
        </div>
      </div>
      {distanceInMiles && coordinatesDestination && coordinatesOrigin ? (
        <>
          <div className="pb-4">
            <h2 className="text-lg">Distance:</h2>
            <p className="text-xl font-bold">{`${distanceInMiles.toFixed(
              2
            )} nautic mile${distanceInMiles === 1 ? "" : "s"}`}</p>
          </div>
          <MapDisplay
            origin={coordinatesOrigin}
            destination={coordinatesDestination}
            isLoading={!data.isLoaded}
            center={calculateCenterOfTwoCoordinates(coordinatesDestination, coordinatesOrigin)}
          />
        </>
      ) : null}
    </div>
  );
}
