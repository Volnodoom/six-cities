import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiActions, APIRoutes, Cities, LoadingStatus, NameSpace, SortingLabel } from '../../const';
import { AppDispatch, DataOffers, State } from '../../types/state';
import { RawOffer } from '../../types/types';
import { adaptOfferToClient } from '../../services/adapters';
import { AxiosInstance } from 'axios';
import { errorHandle } from '../../services/error-handle';
import { findOfferIntoOffers } from '../../utils/utils-components';

const initialState: DataOffers = {
  listOffers: [],
  currentCity: Cities.Paris,
  sortType: SortingLabel.Popular,
  listOffersForCity: [],
  errorOffers: null,
  loadingOffersStatus: LoadingStatus.Idle,
};

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  ApiActions.FetchOffers,
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<RawOffer[]>(APIRoutes.Offers);
      const adaptedData = data.map((line) => adaptOfferToClient(line));
      dispatch(listOffers(adaptedData));
    } catch (error) {
      dispatch(setLoadingOffersStatus(LoadingStatus.Failed));
      errorHandle(error);
    }
  },
);

export const dataOffers = createSlice({
  name: NameSpace.DataOffers,
  initialState,
  reducers: {
    listOffers: (state, action) => {
      state.listOffers = action.payload;
    },
    clearListOffers: (state) => {
      state.listOffers = [];
    },
    currentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    currentSort: (state, action) => {
      state.sortType = action.payload;
    },
    listOffersForCity: (state, action) => {
      state.listOffersForCity = action.payload;
    },
    updateFavoriteInOffers: (state, action) => {
      const offerToChange = findOfferIntoOffers(state.listOffers, action.payload);

      if (offerToChange) {
        offerToChange.isFavorite = !offerToChange.isFavorite;
      }
    },
    setLoadingOffersStatus: (state, action) => {
      state.loadingOffersStatus = action.payload;
    },
    setErrorOffers: (state, action) => {
      state.errorOffers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state, action) => {
        state.loadingOffersStatus = LoadingStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.loadingOffersStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.loadingOffersStatus = LoadingStatus.Failed;
      });
  },
});

export const {
  listOffers,
  currentCity,
  listOffersForCity,
  setErrorOffers,
  currentSort,
  setLoadingOffersStatus,
  updateFavoriteInOffers,
  clearListOffers,
} = dataOffers.actions;
