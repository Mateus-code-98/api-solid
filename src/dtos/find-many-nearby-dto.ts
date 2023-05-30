export interface IFindManyNearbyDTO {
  userLocation: {
    latitude: number;
    longitude: number;
  };
  page: number;
}
