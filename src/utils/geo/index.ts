type PointCallback = (
  results: google.maps.GeocoderResult[] | null,
  status: google.maps.GeocoderStatus
) => void;

export const fetchCoordinates = (
  origin: string,
  originCallback: PointCallback,
) => {
  const geocoderService = new google.maps.Geocoder();
  geocoderService.geocode({ address: origin }, originCallback);
};
