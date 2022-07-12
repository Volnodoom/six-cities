import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiActions, APIRoutes, FavoriteCondition, LoadingStatus, NameSpace } from '../../const';
import { adaptOfferToClient } from '../../services/adapters';
import { errorHandle } from '../../services/error-handle';
import { AppDispatch, DataFavorites, State } from '../../types/state';
import { RawOffer, SingleOffer } from '../../types/types';
import { findOfferIntoOffers } from '../../utils/utils-components';
import { listOffers, updateFavoriteInOffers } from '../data-offers/data-offers';
import { updateFavoriteInProperty } from '../data-property/data-property';

const initialState: DataFavorites = {
  favoriteOffers: [],
  loadingStatus: LoadingStatus.Idle,
  errors: null,
};

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActions.FetchFavorites,
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<RawOffer[]>(APIRoutes.Favorites);
      const adaptedData = data.map((line) => adaptOfferToClient(line));
      dispatch(listOffers(adaptedData));
      dispatch(setFavorites(adaptedData));
    } catch (error) {
      dispatch(setLoadingFavoriteStatus(LoadingStatus.Failed));
      errorHandle(error);
    }
  },
);

export const postFavoriteAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActions.PostFavorite,
  async (id, {dispatch, getState, extra: api}) => {
    try {
      let foundOffer: SingleOffer | undefined | null;
      const offerListData = getState().DATA_OFFERS.listOffers;
      const propertyData = getState().DATA_PROPERTY.property;
      const favoritesData = getState().DATA_FAVORITES.favoriteOffers;

      if (offerListData.length > 0) {
        foundOffer = findOfferIntoOffers(offerListData, id);
      } else if (propertyData) {
        foundOffer = propertyData;
      } else if (offerListData.length === 0 && propertyData === null) {
        foundOffer = findOfferIntoOffers(favoritesData, id);
      }

      if (foundOffer) {
        const favoriteLabelToggled = foundOffer.isFavorite ? FavoriteCondition.Remove : FavoriteCondition.Add;
        await api.post(APIRoutes.FavoriteOne(id, favoriteLabelToggled));

        if (offerListData.length > 0) {
          dispatch(updateFavoriteInOffers(id));
        } else if (propertyData) {
          dispatch(updateFavoriteInProperty());
        } else if (offerListData.length === 0 && propertyData === null) {
          const newFavorites = favoritesData.filter((line) => line.id !== id);
          if(newFavorites) {
            dispatch(setFavorites(newFavorites));
          }
        }
      }
    } catch (error) {
      dispatch(setLoadingFavoriteStatus(LoadingStatus.Failed));
      errorHandle(error);
    }
  },
);

export const dataFavorites = createSlice({
  name: NameSpace.DataFavorites,
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favoriteOffers = action.payload;
    },
    setLoadingFavoriteStatus: (state, action) => {
      state.loadingStatus = action.payload;
    },
    setErrorFavorites: (state, action) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.pending, (state, action) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchFavoritesAction.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.Failed;
      });
  },
});

export const {setErrorFavorites, setLoadingFavoriteStatus, setFavorites} = dataFavorites.actions;
