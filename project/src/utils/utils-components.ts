import { DivIcon, Map, Marker } from 'leaflet';
import { AuthorizationStatus, HUNDRED, STARS_NUMBER, STAR_STEP, TEN } from '../const';
import { SingleOffer } from '../types/types';

export const getStarRating = (rating: number): number => {
  const percentageValue = Math.round(rating*TEN/STARS_NUMBER)*TEN;

  if (percentageValue > HUNDRED) {
    return HUNDRED;
  } else if (Number(percentageValue)%STAR_STEP !== 0) {
    return Math.round(percentageValue/STAR_STEP)*STAR_STEP;
  } else {
    return percentageValue;
  }
};

export const filterCity = (cityName:string, accommodations:SingleOffer[]): SingleOffer[] =>
  accommodations.filter((offer) => offer.city.name === cityName);

export const designPinOnMap = (latitude: number, longitude: number, pin: DivIcon, map: Map) => {
  const marker = new Marker({
    lat: latitude,
    lng: longitude,
  });

  return marker.setIcon(pin).addTo(map);
};

export const sortLowToHigh = (list: SingleOffer[]):SingleOffer[] =>
  list
    .slice()
    .sort((valueA, valueB) => valueA.price - valueB.price);

export const sortHighToLow = (list: SingleOffer[]):SingleOffer[] =>
  list
    .slice()
    .sort((valueA, valueB) => valueB.price - valueA.price);

export const sortTopRate = (list: SingleOffer[]):SingleOffer[] =>
  list
    .slice()
    .sort((valueA, valueB) => valueB.rating - valueA.rating);

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
