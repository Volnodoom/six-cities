import { createAction } from '@reduxjs/toolkit';
import { Cities } from '../const';
import { ActionType } from '../types/action-types';
import { SingleOffer } from '../types/types';

export const currentCity = createAction<Cities>(
  ActionType.currentCity,
);

export const listOffersForCity = createAction<SingleOffer[] | []>(
  ActionType.listOffersForCity,
);

export const listOffers = createAction<SingleOffer[]>(
  ActionType.listOffers,
);

