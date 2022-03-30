import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiActions, APIRoutes, LoadingStatus, NameSpace } from '../../const';
import { adaptOfferToClient, adaptReviewToClient } from '../../services/adapters';
import { errorHandle } from '../../services/error-handle';
import { AppDispatch, DataProperty, State } from '../../types/state';
import { RawOffer, RawReview } from '../../types/types';

const initialState: DataProperty = {
  reviews: [],
  property: null,
  nearbyOffers: [],
  loadingPropertyStatus: LoadingStatus.Idle,
  errorProperty: null,
};

export const fetchPropertyDataAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  ApiActions.FetchPropertyData,
  async (id, {dispatch, extra: api}) => {
    try {
      const result = await Promise.all([
        api.get<RawOffer>(APIRoutes.Property(id)),
        api.get<RawReview[]>(APIRoutes.Reviews(id)),
        api.get<RawOffer[]>(APIRoutes.nearbyOffers(id)),
      ]);

      const [propertyResult, reviewsResult, nearbyResult] = result;

      dispatch(
        property(
          adaptOfferToClient(propertyResult.data),
        ),
      );

      dispatch(
        reviews(
          reviewsResult.data.map((line) => adaptReviewToClient(line)),
        ),
      );

      dispatch(
        nearbyOffers(
          nearbyResult.data.map((line) => adaptOfferToClient(line)),
        ),
      );
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const dataProperty = createSlice({
  name: NameSpace.DataProperty,
  initialState,
  reducers: {
    reviews: (state, action) => {
      state.reviews = action.payload;
    },
    property: (state, action) => {
      state.property = action.payload;
    },
    nearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    setError: (state, action) => {
      state.errorProperty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyDataAction.pending, (state, action) => {
        state.loadingPropertyStatus = LoadingStatus.Loading;
      })
      .addCase(fetchPropertyDataAction.fulfilled, (state, action) => {
        state.loadingPropertyStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchPropertyDataAction.rejected, (state, action) => {
        state.loadingPropertyStatus = LoadingStatus.Failed;
      });

  },
});

export const {reviews, property, nearbyOffers, setError} = dataProperty.actions;
