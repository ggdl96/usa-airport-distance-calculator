import { useMemo } from "react";
import { useLoadScript } from "@react-google-maps/api";

const useGoogleMaps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  return useMemo(
    () => ({
      isLoaded,
    }),
    [isLoaded]
  );
};

export default useGoogleMaps;
