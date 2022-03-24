import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, Cities } from '../const';
import { CityData } from '../types/state';
import { currentCity, listOffers, listOffersForCity, requireAuthorization } from './action';


const initialState: CityData = {
  currentCity: Cities.Paris,
  listOffersForCity: [],
  listOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(currentCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(listOffersForCity, (state, action) => {
      state.listOffersForCity = action.payload;
    }).addCase(listOffers, (state, action) => {
      state.listOffers = action.payload;
    }).addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
