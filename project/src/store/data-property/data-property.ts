import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ApiActions, APIRoutes, LIMITED_NUMBER_OF_NEAREST_ACCOMMODATIONS, LoadingStatus, NameSpace } from '../../const';
import { adaptOfferToClient, adaptReviewToClient } from '../../services/adapters';
import { errorHandle } from '../../services/error-handle';
import { AppDispatch, DataProperty, State } from '../../types/state';
import { RawOffer, RawReview, SingleOffer, SingleReview, UserReviewType } from '../../types/types';

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
        setProperty(
          adaptOfferToClient(propertyResult.data),
        ),
      );

      dispatch(
        setReviews(
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
        setReviews(
          data.map((line ) => adaptReviewToClient(line)),
        ),
      );
    } catch (error) {
      dispatch(setReviewStatus(LoadingStatus.Failed));
      errorHandle(error);
      throw new Error();
    }
  },
);


export const dataProperty = createSlice({
  name: NameSpace.DataProperty,
  initialState,
  reducers: {
    setProperty: (state, action: PayloadAction<SingleOffer | null>) => {
      state.property = action.payload;
    },
    updateFavoriteInProperty: (state) => {
      if (state.property) {
        state.property.isFavorite = !state.property?.isFavorite;
      }
    },
    setReviews: (state, action: PayloadAction<SingleReview[] | []>) => {
      state.reviews = action.payload;
    },
    setReviewStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.loadingReviewStatus = action.payload;
    },
    nearbyOffers: (state, action: PayloadAction<SingleOffer[]>) => {
      state.nearbyOffers = action.payload;
    },
    setErrorProperty: (state, action: PayloadAction<string | null>) => {
      state.errorProperty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyDataAction.pending, (state) => {
        state.loadingPropertyStatus = LoadingStatus.Loading;
      })
      .addCase(fetchPropertyDataAction.fulfilled, (state) => {
        state.loadingPropertyStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchPropertyDataAction.rejected, (state) => {
        state.loadingPropertyStatus = LoadingStatus.Failed;
      })
      .addCase(fetchUserReviewAction.pending, (state) => {
        state.loadingReviewStatus = LoadingStatus.Loading;
      })
      .addCase(fetchUserReviewAction.fulfilled, (state) => {
        state.loadingReviewStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchUserReviewAction.rejected, (state) => {
        state.loadingReviewStatus = LoadingStatus.Failed;
      });
  },
});

export const {
  setReviews,
  setProperty,
  nearbyOffers,
  setErrorProperty,
  setReviewStatus,
  updateFavoriteInProperty,
} = dataProperty.actions;
