import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { Coordinates } from "@/types/Geo";
import { containerStyle, labelStyles, lineStyles } from "./styles";

const MapDisplay = ({
  origin,
  destination,
  isLoading,
  center = { lat: 37.7749, lng: -122.4194 },
  destinationName = "",
  originName = "",
}: {
  origin: Coordinates;
  destination: Coordinates;
  isLoading: boolean;
  center?: Coordinates;
  destinationName: string;
  originName: string;
}) => {
  const [options, setOptions] = useState({
    minZoom: 3,
    maxZoom: 7,
  });

  const [fontSizes, setFontSizes] = useState({
    airportLabel: "2rem",
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();

      [origin, destination].forEach((point) => bounds.extend(point));

      mapRef.current.fitBounds(bounds, {
        top: 80,
        bottom: 80,
        left: 80,
        right: 80,
      });
    }
  }, [origin, destination]);
  useEffect(() => {
    const updateZoom = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setOptions({
          minZoom: 3,
          maxZoom: 7,
        });
        setFontSizes({
          airportLabel: "0.8rem",
        });
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        setOptions({
          minZoom: 3,
          maxZoom: 8,
        });

        setFontSizes({
          airportLabel: "0.9rem",
        });
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setOptions({
          minZoom: 4,
          maxZoom: 9,
        });
        setFontSizes({
          airportLabel: "1.2rem",
        });
      } else {
        setOptions({
          minZoom: 5,
          maxZoom: 12,
        });
        setFontSizes({
          airportLabel: "1.4rem",
        });
      }
    };

    updateZoom();
    window.addEventListener("resize", updateZoom);

    return () => {
      window.removeEventListener("resize", updateZoom);
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={options.minZoom}
      options={options}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      <Marker
        position={origin}
        label={{
          ...labelStyles,
          text: originName,
          fontSize: fontSizes.airportLabel,
        }}
      />
      <Marker
        position={destination}
        label={{
          ...labelStyles,
          text: destinationName,
          fontSize: fontSizes.airportLabel,
        }}
      />
      <Polyline path={[origin, destination]} options={lineStyles} />
    </GoogleMap>
  );
};

export default MapDisplay;
