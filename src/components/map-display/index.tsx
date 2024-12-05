import React from "react";
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
  if (isLoading) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
      <Marker position={origin} label={{ ...labelStyles, text: originName }} />
      <Marker
        position={destination}
        label={{ ...labelStyles, text: destinationName }}
      />
      <Polyline
        path={[origin, destination]}
        options={lineStyles}
      />
    </GoogleMap>
  );
};

export default MapDisplay;
