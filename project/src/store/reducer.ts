import { createReducer } from '@reduxjs/toolkit';
import { Cities } from '../const';
import { CityData } from '../types/state';
import { currentCity, listOffers, listOffersForCity } from './action';


const initialState: CityData = {
  currentCity: Cities.Paris,
  listOffersForCity: [],
  listOffers: [],
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
    });
});

export {reducer};
