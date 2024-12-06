import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const updateZoom = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setOptions({
          minZoom: 3,
          maxZoom: 7,
        });
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        setOptions({
          minZoom: 3,
          maxZoom: 8,
        });
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setOptions({
          minZoom: 4,
          maxZoom: 9,
        });
      } else {
        setOptions({
          minZoom: 5,
          maxZoom: 12,
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
    >
      <Marker position={origin} label={{ ...labelStyles, text: originName }} />
      <Marker
        position={destination}
        label={{ ...labelStyles, text: destinationName }}
      />
      <Polyline path={[origin, destination]} options={lineStyles} />
    </GoogleMap>
  );
};

export default MapDisplay;
