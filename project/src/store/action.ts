import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, Cities } from '../const';
import { ActionTypes } from '../types/action-types';
import { SingleOffer, SingleReview } from '../types/types';
import { UserData } from '../types/user-info-type';

export const currentCity = createAction<Cities>(ActionTypes.currentCity);

export const listOffersForCity = createAction<SingleOffer[] | []>(ActionTypes.listOffersForCity);

export const listOffers = createAction<SingleOffer[]>(ActionTypes.listOffers);

export const reviews = createAction<SingleReview[] | []>(ActionTypes.reviews);

export const property = createAction<SingleOffer | null>(ActionTypes.property);

export const nearbyOffers = createAction<SingleOffer []>(ActionTypes.nearbyOffers);

export const favorites = createAction<SingleOffer [] | []>(ActionTypes.favorites);

export const requireAuthorization = createAction<AuthorizationStatus>(ActionTypes.requireAuthorization);

export const setError = createAction<string>(ActionTypes.setError);

export const userInformation = createAction<UserData>(ActionTypes.userInformation);

export const redirectToRoute = createAction<string>(ActionTypes.redirect);

