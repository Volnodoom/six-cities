import { AuthorizationStatus, Cities, LoadingStatus } from '../const';
import { store } from '../store/index';
import { SingleOffer, SingleReview } from './types';
import { UserData } from './user-info-type';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type CityData = {
  listOffers: SingleOffer[] | [],
  currentCity: Cities,
  listOffersForCity: SingleOffer[] | [],
  reviews: SingleReview[] | [],
  property: SingleOffer | null,
  nearbyOffers: SingleOffer[],
  favorites: SingleOffer[] | [],
  authorizationStatus: AuthorizationStatus,
  error: string,
  isDataLoaded: boolean,
  userInformation: UserData | null;
}

export type DataOffers = {
  listOffers: SingleOffer[] | [],
  currentCity: Cities,
  listOffersForCity: SingleOffer[] | [],
  loadingOffersStatus: LoadingStatus,
  errorOffers: string | null,
}

export type DataUser = {
  userInformation: UserData | null;
  authorizationStatus: AuthorizationStatus,
  loadingUserStatus: LoadingStatus,
  errorUser: string | null,
}

export type DataProperty = {
  reviews: SingleReview[] | [],
  property: SingleOffer | null,
  nearbyOffers: SingleOffer[],
  loadingPropertyStatus: LoadingStatus,
  errorProperty: string | null,
}

