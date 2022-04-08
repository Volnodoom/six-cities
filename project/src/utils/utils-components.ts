import { DivIcon, Map, Marker } from 'leaflet';
import { AuthorizationStatus, Cities, ErrorMessageContentPassword, HUNDRED, SortingLabel, STARS_NUMBER, STAR_STEP, TEN } from '../const';
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

export const designPinOnMap = (latitude: number, longitude: number, pin: DivIcon, map: Map) => {
  const marker = new Marker({
    lat: latitude,
    lng: longitude,
  });

  return marker.setIcon(pin).addTo(map);
};

export const filterOffersForCity = (cityName:string, accommodations:SingleOffer[]): SingleOffer[] =>
  accommodations.filter((offer) => offer.city.name === cityName);

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

export const getOffersAccordingSortType = (kind:SortingLabel, offers:SingleOffer[]): SingleOffer[] => {
  switch (kind) {
    case SortingLabel.Low:
      return sortLowToHigh(offers);
    case SortingLabel.High:
      return sortHighToLow(offers);
    case SortingLabel.TopRate:
      return sortTopRate(offers);
    default:
      return offers;
  }
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const Pattern = {
  Number: new RegExp(/[0-9]/, 'g'),
  Letter: new RegExp(/[a-z]/, 'gi'),
  WhiteSpace: new RegExp(/\s/, 'g'),
};

const isErrorMatchedPattern = (pattern: RegExp) =>
  (value: string) => [...value.matchAll(pattern)].length === 0;

const matchedErrors = (value: string): boolean[] => ([
  isErrorMatchedPattern(Pattern.Number)(value),
  isErrorMatchedPattern(Pattern.Letter)(value),
  !isErrorMatchedPattern(Pattern.WhiteSpace)(value),
]);

const filterConcatArray =  (errors: boolean[]): number[] =>
  errors.reduce((newArr: number[], error, indx) =>
    error ? newArr.concat([indx]) : newArr, []);

const provideErrorsMessage = (errorMessage: string[]) =>
  (data: number[]) :string => data.length > 0 ? errorMessage[data[0]] : '';

const passwordErrorMessage = provideErrorsMessage(ErrorMessageContentPassword);

const pipePasswordFunctions = (...fns: any[]) =>
  (value: string):string =>
    fns.reduce((prevValue, fn) =>
      fn(prevValue), value);

export const isErrorInPassword = pipePasswordFunctions(
  matchedErrors,
  filterConcatArray,
  passwordErrorMessage,
);

export const cityList =  Object.values(Cities);

export const filterFavoritesByCity =
  (favorites: SingleOffer[]): Array<[Cities, SingleOffer[]]> => cityList.map((town) => {
    const filtratedCity = favorites.filter((offer) => offer.city.name === town);
    return filtratedCity && [town, filtratedCity];
  },
  );

export const findOfferIntoOffers = (dataToCheck: SingleOffer[], id: number) => dataToCheck.find((line) => line.id === id);
