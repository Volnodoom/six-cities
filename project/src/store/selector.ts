import { AuthorizationStatus, Cities } from '../const';
import { State } from '../types/state';
import { SingleOffer, SingleReview } from '../types/types';
import { UserData } from '../types/user-info-type';

export const getOffers = (state: State): SingleOffer[] | [] => state.listOffers;
export const getCurrentCity = (state: State): Cities => state.currentCity;
export const getOffersForCity = (state: State): SingleOffer[] => state.listOffersForCity;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state.authorizationStatus;
export const getError = (state: State): string => state.error;
export const getIsDataLoadedStatus = (state: State): boolean => state.isDataLoaded;
export const getReviews = (state: State): SingleReview[] => state.reviews;
export const getProperty = (state: State): SingleOffer | null => state.property;
export const getNearbyOffers = (state: State): SingleOffer[] => state.nearbyOffers;
export const getFavorites = (state: State): SingleOffer[] | [] => state.favorites;
export const getUserInfo = (state: State): UserData | null => state.userInformation;


