import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, Cities } from '../const';
import { ActionType } from '../types/action-types';
import { SingleOffer, SingleReview } from '../types/types';
import { UserData } from '../types/user-info-type';

export const currentCity = createAction<Cities>(
  ActionType.currentCity,
);

export const listOffersForCity = createAction<SingleOffer[] | []>(
  ActionType.listOffersForCity,
);

export const listOffers = createAction<SingleOffer[]>(
  ActionType.listOffers,
);

export const reviews = createAction<SingleReview[] | []>(
  ActionType.reviews,
);

export const property = createAction<SingleOffer | null>(
  ActionType.property,
);

export const nearbyOffers = createAction<SingleOffer []>(
  ActionType.nearbyOffers,
);

export const favorites = createAction<SingleOffer [] | []>(
  ActionType.favorites,
);

export const requireAuthorization = createAction<AuthorizationStatus>(
  ActionType.requireAuthorization,
);

export const setError = createAction<string>(
  ActionType.setError,
);


export const userInformation = createAction<UserData>(
  ActionType.userInformation,
);

