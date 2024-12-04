import React from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import { Coordinates } from "@/types/Geo";
import tailwindFullConfig from "@/utils/tailwind-theme";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapDisplay = ({
  origin,
  destination,
  isLoading,
  center = { lat: 37.7749, lng: -122.4194 },
}: {
  origin: Coordinates;
  destination: Coordinates;
  isLoading: boolean;
  center?: Coordinates;
}) => {
  if (isLoading) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
      <Polyline
        path={[origin, destination]}
        options={{
          strokeColor: tailwindFullConfig.theme.colors.input,
          strokeOpacity: 0.6,
          strokeWeight: 2,
        }}
      />
    </GoogleMap>
  );
};

export default MapDisplay;
