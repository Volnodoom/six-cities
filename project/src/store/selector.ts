import { AuthorizationStatus, Cities } from '../const';
import { State } from '../types/state';
import { SingleOffer } from '../types/types';

export const getOffers = (state: State): SingleOffer[] => state.listOffers;
export const getCurrentCity = (state: State): Cities => state.currentCity;
export const getOffersForCity = (state: State): SingleOffer[] => state.listOffersForCity;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state.authorizationStatus;
