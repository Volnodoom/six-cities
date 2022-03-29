import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoutes, AppRoutes, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { adaptOfferToClient, adaptReviewToClient, adaptUserInfoToClient } from '../services/adapters';
import { errorHandle } from '../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import { store, api } from '../store';
import { RawOffer, RawReview } from '../types/types';
import { AuthData, RawUserData, UserData } from '../types/user-info-type';
import { favorites, listOffers, nearbyOffers, property, redirectToRoute, requireAuthorization, reviews, setError, userInformation } from './action';


export const clearErrorAction = createAsyncThunk(
  'data/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try{
      await api.get(APIRoutes.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoutes.Login, {password, email});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoutes.Root));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoutes.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<RawOffer[]>(APIRoutes.Offers);
      const adaptedData = data.map((line) => adaptOfferToClient(line));
      store.dispatch(listOffers(adaptedData));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchGetReviewsAction = createAsyncThunk(
  'data/fetchGetReviews',
  async (id:number) => {
    try {
      const {data} = await api.get<RawReview[]>(APIRoutes.Reviews(id));
      const adaptedData = data.map((line) => adaptReviewToClient(line));
      store.dispatch(reviews(adaptedData));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk(
  'data/fetchFavorites',
  async () => {
    try {
      const {data} = await api.get<RawOffer[] | []>(APIRoutes.Favorites);
      const adaptedData = data.map((line) => adaptOfferToClient(line));
      store.dispatch(favorites(adaptedData));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk(
  'data/fetchNearbyOffers',
  async (id:number) => {
    try {
      const {data} = await api.get<RawOffer[]>(APIRoutes.nearbyOffers(id));
      const adaptedData = data.map((line) => adaptOfferToClient(line));
      store.dispatch(nearbyOffers(adaptedData));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchPropertyAction = createAsyncThunk(
  'data/fetchProperty',
  async (id:number) => {
    try {
      const {data} = await api.get<RawOffer>(APIRoutes.Property(id));
      const adaptedData =  adaptOfferToClient(data);
      store.dispatch(property(adaptedData));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchUserDataAction = createAsyncThunk(
  'data/fetchUserData',
  async () => {
    try {
      const {data} = await api.get<RawUserData>(APIRoutes.Login);
      const adaptedData =  adaptUserInfoToClient(data);
      store.dispatch(userInformation(adaptedData));
    } catch (error) {
      errorHandle(error);
    }
  },
);
