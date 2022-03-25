import { AuthorizationStatus, Cities } from '../const';
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
