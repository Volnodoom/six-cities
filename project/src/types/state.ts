import { AuthorizationStatus, Cities, LoadingStatus, SortingLabel } from '../const';
import { store } from '../store/index';
import { SingleOffer, SingleReview } from './types';
import { UserData } from './user-info-type';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DataOffers = {
  listOffers: SingleOffer[] | [],
  currentCity: Cities,
  sortType: SortingLabel,
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
  loadingReviewStatus: LoadingStatus,
  errorProperty: string | null,
}

export type DataFavorites = {
  favoriteOffers: SingleOffer [] | [],
  loadingStatus: LoadingStatus,
  errors: string | null,
}
