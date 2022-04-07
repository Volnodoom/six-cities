import { LoadingStatus } from '../../const';
import { State } from '../../types/state';
import { SingleOffer, SingleReview } from '../../types/types';

export const getProperty = (state: State): SingleOffer | null => state.DATA_PROPERTY.property;
export const getReviews = (state: State): SingleReview[] => state.DATA_PROPERTY.reviews;
export const getReviewStatus = (state: State): LoadingStatus => state.DATA_PROPERTY.loadingReviewStatus;
export const getNearbyOffers = (state: State): SingleOffer[] => state.DATA_PROPERTY.nearbyOffers;
export const getPropertyLoadingStatus = (state: State): string | null => state.DATA_PROPERTY.loadingPropertyStatus;
export const getPropertyError = (state: State): string | null => state.DATA_PROPERTY.errorProperty;
