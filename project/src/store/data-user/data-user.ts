import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, LoadingStatus, NameSpace } from '../../const';
import { DataUser } from '../../types/state';

const initialState: DataUser = {
  userInformation: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  loadingUserStatus: LoadingStatus.Idle,
  errorUser: null,
};

export const dataUser = createSlice({
  name: NameSpace.DataUser,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    userInformation: (state, action) => {
      state.userInformation = action.payload;
    },
    setError: (state, action) => {
      state.errorUser = action.payload;
    },
  },
});

export const {requireAuthorization, userInformation} = dataUser.actions;
