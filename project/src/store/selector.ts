import { AuthorizationStatus, Cities } from '../const';
import { State } from '../types/state';
import { SingleOffer, SingleReview } from '../types/types';
import { UserData } from '../types/user-info-type';

export const getOffers = (state: State): SingleOffer[] | [] => state.DATA_OFFERS.listOffers;
export const getCurrentCity = (state: State): Cities => state.DATA_OFFERS.currentCity;
export const getOffersForCity = (state: State): SingleOffer[] => state.DATA_OFFERS.listOffersForCity;
export const getOffersLoadingStatus = (state: State): string | null => state.DATA_OFFERS.loadingOffersStatus;
export const getOffersError = (state: State): string | null => state.DATA_OFFERS.errorOffers;

export const getProperty = (state: State): SingleOffer | null => state.DATA_PROPERTY.property;
export const getReviews = (state: State): SingleReview[] => state.DATA_PROPERTY.reviews;
export const getNearbyOffers = (state: State): SingleOffer[] => state.DATA_PROPERTY.nearbyOffers;
export const getPropertyLoadingStatus = (state: State): string | null => state.DATA_PROPERTY.loadingPropertyStatus;
export const getPropertyError = (state: State): string | null => state.DATA_PROPERTY.errorProperty;

// export const getFavorites = (state: State): SingleOffer[] | [] => state.favorites;

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state.DATA_USER.authorizationStatus;
export const getUserInfo = (state: State): UserData | null => state.DATA_USER.userInformation;
export const getUserLoadingStatus = (state: State): string | null => state.DATA_USER.loadingUserStatus;
export const getUserError = (state: State): string | null => state.DATA_USER.errorUser;


