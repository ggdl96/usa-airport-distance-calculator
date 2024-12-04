import { Coordinates } from "@/types/Geo";

export const caclculateDistanceBetweenTwoPoints = (
  coordinatesA: Coordinates,
  coordinatesB: Coordinates
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(coordinatesB.lat - coordinatesA.lat);
  const dLng = toRad(coordinatesB.lng - coordinatesA.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coordinatesA.lat)) *
      Math.cos(toRad(coordinatesB.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

export const kmsToMiles = (distanceInKM: number) => distanceInKM * 0.5399565;

export const calculateCenterOfTwoCoordinates = (
  coordinatesA: Coordinates,
  coordinatesB: Coordinates
): Coordinates => {
  const centerLat = (coordinatesA.lat + coordinatesB.lat) / 2;
  const centerLng = (coordinatesA.lng + coordinatesB.lng) / 2;
  return { lat: centerLat, lng: centerLng };
};
