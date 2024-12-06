"use client";

import SearchInput from "@/components/search-input";
import { SelectOptionList } from "@/types/select";
import { useCallback, useEffect, useState } from "react";
import MapDisplay from "../map-display";
import {
  caclculateDistanceBetweenTwoPoints,
  calculateCenterOfTwoCoordinates,
  kmsToMiles,
} from "@/utils/distance-calculator";
import useGoogleMaps from "@/hooks/useGoogleMaps";
import { Coordinates } from "@/types/Geo";
import { getNameFromAirportCode } from "@/utils/airport";
import { transformToAirports } from "@/mappers/airlabs";
import { RequestStatus } from "@/types/request-status";
import { AirportList } from "@/types/airport";

export default function DistanceCalculator() {
  const [originOptions, setOriginOptions] = useState<SelectOptionList>([]);
  const [destinationOptions, setDestinationOptions] =
    useState<SelectOptionList>([]);
  const [originAirports, setOriginAirports] = useState<AirportList>([]);
  const [destinationAirports, setDestinationAirports] = useState<AirportList>(
    []
  );
  const [destinationSearchStatus, setDestinationSearchStatus] =
    useState<RequestStatus>("DEFAULT");
  const [originSearchStatus, setOriginSearchStatus] =
    useState<RequestStatus>("DEFAULT");

  const [originSelected, setOriginSelected] = useState("");
  const [originSelectedName, setOriginSelectedName] = useState("");
  const [destinationSelected, setDestinationSelected] = useState("");
  const [destinationSelectedName, setDestinationSelectedName] = useState("");

  const [coordinatesOrigin, setCoordinatesOrigin] =
    useState<Coordinates | null>();
  const [coordinatesDestination, setCoordinatesDestination] =
    useState<Coordinates | null>();
  const [distanceInMiles, setDistanceInMiles] = useState(0);
  const [displayError, setDisplayError] = useState({
    display: false,
    message: 'Unexpected Error',
  });

  const data = useGoogleMaps();

  useEffect(() => {
    if (originSelected && destinationSelected) {
      const dataOrigin = originAirports.find(
        (item) => item.id === originSelected
      );
      const dataDestination = destinationAirports.find(
        (item) => item.id === destinationSelected
      );
      console.log('originSelected && destinationSelected', originSelected,destinationSelected);
      console.log('dataOrigin && dataDestination', dataDestination,dataDestination);

      if (dataOrigin && dataDestination) {
        setCoordinatesOrigin({
          lat: dataOrigin?.lat,
          lng: dataOrigin?.lng,
        });
        setCoordinatesDestination({
          lat: dataDestination?.lat,
          lng: dataDestination?.lng,
        });
      } else {
        setDisplayError({
          display: false,
          message: 'Unexpected Error',
        });
      }

      return () => {
        setCoordinatesDestination(null);
        setCoordinatesOrigin(null);
      };
    }
  }, [originSelected, destinationSelected, originAirports, destinationAirports]);

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

  const handleOnSelectFrom = function (value: string): void {
    setOriginSelected(value);
    setOriginSelectedName(getNameFromAirportCode(originOptions, value));
  };

  const handleOnSelectTo = function (value: string): void {
    setDestinationSelected(value);
    setDestinationSelectedName(
      getNameFromAirportCode(destinationOptions, value)
    );
  };

  const inputCCS = "w-full sm:w-1/2 pb-2 pt-2 sm:p-2";

  const getLocal = async (search: string) => {
    const response = await fetch(`api/search?search=${search}`);

    if (response.ok) {
      const body = await response.json();

      return transformToAirports(body);
    }

    return [];
  };

  const onError = () => {
    console.error("there was an error requesting the airport list");
  };

  const onSearchFrom = useCallback(
    function (search: string): void {
      const promise = async () => {
        setOriginSearchStatus("LOADING");
        const data: SelectOptionList = [];

        try {
          const result = await getLocal(search);
          setOriginAirports(result);
          for (const item of result) {
            if (item.id !== destinationSelected) {
              data.push({
                value: item.id,
                label: item.name,
              });
            }
          }

          setOriginOptions(data);
          setOriginSearchStatus("DONE");
        } catch (error) {
          onError();
          console.error("error, search origin", error);
        }
      };

      promise();
    },
    [destinationSelected]
  );

  const onSearchTo = useCallback(
    function (search: string): void {
      const promise = async () => {
        setDestinationSearchStatus("LOADING");

        const data: SelectOptionList = [];
        try {
          const result = await getLocal(search);
          setDestinationAirports(result);
          for (const item of result) {
            if (item.id !== originSelected) {
              data.push({
                value: item.id,
                label: item.name,
              });
            }
          }

          setDestinationOptions(data);
          setDestinationSearchStatus("DONE");
        } catch (error) {
          onError();
          console.error("error, search origin", error);
        }
      };

      promise();
    },
    [originSelected]
  );

  return (
    <div className="flex flex-col items-center bg-background-form rounded-md shadow-background-form shadow-md w-full max-h-[88vh] min-h-[48vh]">
      {displayError.display ? <div className="w-full md:w-2/3 lg:1/2 bg-foreground absolute top-[50vh] justify-items-center p-4 rounded-md">
        <h2 className="text-input text-lg font-bold">Error</h2>
        <p className="text-error">{displayError.message}</p>
      </div> : null}
      <div className="flex flex-col sm:flex-row pb-1 sm:pb-2 lg:pb-4 w-full flex-nowrap sm:justify-center">
        <div className={inputCCS}>
          <SearchInput
            options={originOptions}
            onSelect={handleOnSelectFrom}
            selectedValue={originSelected}
            placeholder={"Search origin Airport..."}
            onSearch={onSearchFrom}
            searchStatus={originSearchStatus}
          />
        </div>
        <div className={inputCCS}>
          <SearchInput
            options={destinationOptions}
            onSelect={handleOnSelectTo}
            selectedValue={destinationSelected}
            placeholder={"Search destination Airport..."}
            onSearch={onSearchTo}
            searchStatus={destinationSearchStatus}
          />
        </div>
      </div>
      {distanceInMiles && coordinatesDestination && coordinatesOrigin ? (
        <>
          <div className="pb-1 lg:pb-4">
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
            originName={originSelectedName}
            destinationName={destinationSelectedName}
          />
        </>
      ) : null}
    </div>
  );
}
