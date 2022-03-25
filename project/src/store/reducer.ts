import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, Cities } from '../const';
import { CityData } from '../types/state';
import { reviews, currentCity, listOffers, listOffersForCity, requireAuthorization, setError, property, favorites, nearbyOffers, userInformation } from './action';


const initialState: CityData = {
  listOffers: [],
  currentCity: Cities.Paris,
  listOffersForCity: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: '',
  isDataLoaded: false,
  reviews: [],
  property: null,
  favorites: [],
  nearbyOffers: [],
  userInformation: null,
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
      state.isDataLoaded = true;
    }).addCase(reviews, (state, action) => {
      state.reviews = action.payload;
    }).addCase(property, (state, action) => {
      state.property = action.payload;
    }).addCase(nearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    }).addCase(favorites, (state, action) => {
      state.favorites = action.payload;
    }).addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    }).addCase(userInformation, (state, action) => {
      state.userInformation = action.payload;
    }).addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
