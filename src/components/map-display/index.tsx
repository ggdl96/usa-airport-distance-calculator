import React, { useEffect } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import useGoogleMaps from '@/hooks/useGoogleMaps';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.7749, // Example: San Francisco
  lng: -122.4194,
};

const MapDisplay = ({ origin, destination }: {
  origin: string, destination: string
}) => {
    const data = useGoogleMaps();

    useEffect(() => {
      if (data.isLoaded) {
        data.fetchRoute(origin, destination)
    }
    }, [origin, destination, data.isLoaded, data]);
  if (!data.isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
      {data.directionsResponse && <DirectionsRenderer directions={data.directionsResponse} />}
    </GoogleMap>
  );
};

export default MapDisplay;