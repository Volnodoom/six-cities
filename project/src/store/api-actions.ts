import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiActions, APIRoutes, AppRoutes, AuthorizationStatus, CLEAR_ERROR, LoadingStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { adaptUserInfoToClient } from '../services/adapters';
import { errorHandle } from '../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import { AppDispatch, State } from '../types/state';
import { AuthData, RawUserData, UserData } from '../types/user-info-type';
import {  redirectToRoute } from './action';
import { setErrorFavorites } from './data-favorites/data-favorites';
import { setErrorOffers } from './data-offers/data-offers';
import { setErrorProperty } from './data-property/data-property';
import { requireAuthorization, setErrorUser, setLoadingUserStatus, userInformation } from './data-user/data-user';

export const clearErrorAction = createAsyncThunk<void, void, {
  dispatch: AppDispatch,
  state: State,
}>(
  CLEAR_ERROR,
  (_arg, {dispatch}) => {
    setTimeout(
      () => {
        dispatch(setErrorUser(''));
        dispatch(setErrorOffers(''));
        dispatch(setErrorProperty(''));
        dispatch(setErrorFavorites(''));
      },
      TIMEOUT_SHOW_ERROR,
    );

  },
);

export const checkAuthAction = createAsyncThunk<void, void, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  ApiActions.CheckAuthorization,
  async (_arg, {dispatch, extra: api}) => {
    try{
      await api.get(APIRoutes.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      dispatch(setLoadingUserStatus(LoadingStatus.Failed));
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  ApiActions.PostLogin,
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoutes.Login, {password, email});
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoutes.Root));
    } catch (error) {
      dispatch(setLoadingUserStatus(LoadingStatus.Failed));
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, void, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  ApiActions.Logout,
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoutes.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      dispatch(setLoadingUserStatus(LoadingStatus.Failed));
      errorHandle(error);
    }
  },
);

export const fetchUserDataAction = createAsyncThunk<void, void, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  ApiActions.FetchUserData,
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<RawUserData>(APIRoutes.Login);
      const adaptedData =  adaptUserInfoToClient(data);
      dispatch(userInformation(adaptedData));
    } catch (error) {
      dispatch(setLoadingUserStatus(LoadingStatus.Failed));
      errorHandle(error);
    }
  },
);

