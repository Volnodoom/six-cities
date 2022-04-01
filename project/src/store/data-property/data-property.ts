import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ApiActions, APIRoutes, LIMITED_NUMBER_OF_NEAREST_ACCOMMODATIONS, LoadingStatus, NameSpace } from '../../const';
import { adaptOfferToClient, adaptReviewToClient } from '../../services/adapters';
import { errorHandle } from '../../services/error-handle';
import { AppDispatch, DataProperty, State } from '../../types/state';
import { RawOffer, RawReview, SingleOffer, UserReviewType } from '../../types/types';

const initialState: DataProperty = {
  reviews: [],
  property: null,
  nearbyOffers: [],
  loadingPropertyStatus: LoadingStatus.Idle,
  errorProperty: null,
  loadingReviewStatus: LoadingStatus.Idle,
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
          nearbyResult.data
            .slice()
            .splice(0, LIMITED_NUMBER_OF_NEAREST_ACCOMMODATIONS)
            .map((line) => adaptOfferToClient(line)),
        ),
      );
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchUserReviewAction = createAsyncThunk<void, UserReviewType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  ApiActions.FetchReview,
  async ({comment, rating}, {dispatch, getState, extra: api}) => {
    try {
      const {id} = getState().DATA_PROPERTY.property as SingleOffer;
      const {data} : AxiosResponse<RawReview[]> = await api.post(APIRoutes.Reviews(id), {comment, rating});
      dispatch(
        reviews(
          data.map((line ) => adaptReviewToClient(line)),
        ),
      );
    } catch (error) {
      dispatch(reviewStatus(LoadingStatus.Failed));
      errorHandle(error);
      throw new Error();
    }
  },
);


export const dataProperty = createSlice({
  name: NameSpace.DataProperty,
  initialState,
  reducers: {
    property: (state, action) => {
      state.property = action.payload;
    },
    reviews: (state, action) => {
      state.reviews = action.payload;
    },
    reviewStatus: (state, action) => {
      state.loadingReviewStatus = action.payload;
    },
    nearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    setErrorProperty: (state, action) => {
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
      })
      .addCase(fetchUserReviewAction.pending, (state, action) => {
        state.loadingReviewStatus = LoadingStatus.Loading;
      })
      .addCase(fetchUserReviewAction.fulfilled, (state, action) => {
        state.loadingReviewStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchUserReviewAction.rejected, (state, action) => {
        state.loadingReviewStatus = LoadingStatus.Failed;
      });
  },
});

export const {reviews, property, nearbyOffers, setErrorProperty, reviewStatus} = dataProperty.actions;
