import React, { useCallback } from 'react';
import { useLoadScript } from '@react-google-maps/api';


const useGoogleMaps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });

  const [directionsResponse, setDirectionsResponse] = React.useState<google.maps.DirectionsResult | null>(null);

  const fetchRoute = useCallback((origin: string, destination: string) => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`Error fetching directions ${status}`);
        }
      }
    );
  }, []);

  return {isLoaded, fetchRoute, directionsResponse}
};

export default useGoogleMaps;
