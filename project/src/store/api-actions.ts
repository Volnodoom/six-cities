import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoutes, AuthorizationStatus } from '../const';
import { dropToken, saveToken } from '../services/token';
import { store, api } from '../store';
import { AuthData, UserData } from '../types/user-info-type';
import { requireAuthorization } from './action';


export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    await api.get(APIRoutes.Login);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    const {data: {token}} = await api.post<UserData>(APIRoutes.Login, {password, email});
    saveToken(token);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    await api.delete(APIRoutes.Logout);
    dropToken();
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
