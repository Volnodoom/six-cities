import { AuthorizationStatus, Cities } from '../const';
import { store } from '../store/index';
import { SingleOffer } from './types';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type CityData = {
  currentCity: Cities,
  listOffersForCity: SingleOffer [] | [],
  listOffers: SingleOffer [],
  authorizationStatus: AuthorizationStatus,
}
