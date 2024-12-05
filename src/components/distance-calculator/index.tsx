"use client";

import SearchInput from "@/components/search-input";
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
import { getNameFromAirportCode } from "@/utils/airport";
import { getList } from "@/services/airport-list";

type Status = "LOADING" | "DONE" | "DEFAULT";

export default function DistanceCalculator() {
  const [fromOptions, setFromOptions] = useState<SelectOptionList>([]);
  const [toOptions, setToOptions] = useState<SelectOptionList>([]);
  const [toSearchStatus, setToSearchStatus] = useState<Status>("DEFAULT");
  const [fromSearchStatus, setFromSearchStatus] = useState<Status>("DEFAULT");

  const [fromSelected, setFromSelected] = useState("");
  const [fromSelectedName, setFromSelectedName] = useState("");
  const [toSelected, setToSelected] = useState("");
  const [toSelectedName, setToSelectedName] = useState("");

  const [coordinatesOrigin, setCoordinatesOrigin] =
    useState<Coordinates | null>();
  const [coordinatesDestination, setCoordinatesDestination] =
    useState<Coordinates | null>();
  const [distanceInMiles, setDistanceInMiles] = useState(0);

  const data = useGoogleMaps();

  useEffect(() => {
    if (data.isLoaded) {
      if (fromSelectedName && toSelectedName) {
        fetchCoordinates(fromSelectedName, (result, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (result) {
              setCoordinatesOrigin({
                lat: result[0].geometry.location.lat(),
                lng: result[0].geometry.location.lng(),
              });
            }
          }
        });

        fetchCoordinates(toSelectedName, (result, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (result) {
              setCoordinatesDestination({
                lat: result[0].geometry.location.lat(),
                lng: result[0].geometry.location.lng(),
              });
            }
          }
        });

        return () => {
          setCoordinatesDestination(null);
          setCoordinatesOrigin(null);
        };
      }
    }
  }, [data.isLoaded, fromSelectedName, toSelectedName]);

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

  const handleOnSelectFrom = function (value: string): void {
    setFromSelected(value);
    setFromSelectedName(getNameFromAirportCode(fromOptions, value));
  };

  const handleOnSelectTo = function (value: string): void {
    setToSelected(value);
    setToSelectedName(getNameFromAirportCode(toOptions, value));
  };

  const inputCCS = "w-full lg:w-1/2 p-2";

  const onSearchFrom = function (search: string): void {
    const promise = async () => {
      setFromSearchStatus('LOADING');

      const result = await getList(search);
      setFromSearchStatus('DONE');
      const data: SelectOptionList = [];
      for (const item of result) {
        if (item.code !== toSelected) {
          data.push({
            value: item.code,
            label: item.name,
          });
        }
      }

      setFromOptions(data);
    };

    promise();
  };
  const onSearchTo = function (search: string): void {
    const promise = async () => {
      setToSearchStatus('LOADING');
      const result = await getList(search);
      setToSearchStatus('DONE');

      const data: SelectOptionList = [];
      for (const item of result) {
        if (item.code !== fromSelected) {
          data.push({
            value: item.code,
            label: item.name,
          });
        }
      }

      setToOptions(data);
    };

    promise();
  };

  return (
    <div className="flex flex-col items-center bg-background-form rounded-md shadow-background-form shadow-md w-full max-h-[88vh] min-h-[48vh]">
      <div className="flex flex-col lg:flex-row pb-4 w-full flex-wrap lg:justify-center">
        <div className={inputCCS}>
          <SearchInput
            options={fromOptions}
            onSelect={handleOnSelectFrom}
            selectedValue={fromSelected}
            placeholder={"Search origin Airport..."}
            onSearch={onSearchFrom}
            isLoading={toSearchStatus === "LOADING"}
          />
        </div>
        <div className={inputCCS}>
          <SearchInput
            options={toOptions}
            onSelect={handleOnSelectTo}
            selectedValue={toSelected}
            placeholder={"Search destination Airport..."}
            onSearch={onSearchTo}
            isLoading={fromSearchStatus === "LOADING"}
          />
        </div>
      </div>
      {distanceInMiles && coordinatesDestination && coordinatesOrigin ? (
        <>
          <div className="pb-4">
            <h2 className="text-lg">Distance between airports:</h2>
            <p className="text-xl font-bold">{`${distanceInMiles.toFixed(
              2
            )} nautic mile${distanceInMiles === 1 ? "" : "s"}`}</p>
          </div>
          <MapDisplay
            origin={coordinatesOrigin}
            destination={coordinatesDestination}
            isLoading={!data.isLoaded}
            center={calculateCenterOfTwoCoordinates(
              coordinatesDestination,
              coordinatesOrigin
            )}
            originName={fromSelectedName}
            destinationName={toSelectedName}
          />
        </>
      ) : null}
    </div>
  );
}
