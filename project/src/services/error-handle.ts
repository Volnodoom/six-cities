import { ErrorType } from '../types/error-types';
import request from 'axios';
import { AppRoutes, ServerResponse, LoadingStatus, NO_CONNECTION, NO_CONNECTION_MESSAGE } from '../const';
import { store } from '../store';
import { clearErrorAction } from '../store/api-actions';
import { setErrorUser } from '../store/data-user/data-user';
import { setErrorOffers } from '../store/data-offers/data-offers';
import { setErrorProperty } from '../store/data-property/data-property';
import { redirectToRoute } from '../store/action';
import { setErrorFavorites } from '../store/data-favorites/data-favorites';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const handleError = (message: string) => {
    if (store.getState().DATA_USER.loadingUserStatus === LoadingStatus.Failed) {
      store.dispatch(setErrorUser(message));
      store.dispatch(clearErrorAction());
    } else if (store.getState().DATA_OFFERS.loadingOffersStatus === LoadingStatus.Failed) {
      store.dispatch(setErrorOffers(message));
      store.dispatch(clearErrorAction());
    } else if (store.getState().DATA_PROPERTY.loadingPropertyStatus === LoadingStatus.Failed) {
      store.dispatch(setErrorProperty(message));
      store.dispatch(clearErrorAction());
    } else if (store.getState().DATA_PROPERTY.loadingReviewStatus === LoadingStatus.Failed) {
      store.dispatch(setErrorProperty(message));
      store.dispatch(clearErrorAction());
    } else if (store.getState().DATA_FAVORITES.loadingStatus === LoadingStatus.Failed) {
      store.dispatch(setErrorFavorites(message));
      store.dispatch(clearErrorAction());
    }
  };

  const {response} = error;

  if (response) {
    switch (response.status) {
      case ServerResponse.BAD_REQUEST:
        handleError(response.data.error);
        break;
      case ServerResponse.UNAUTHORIZED:
        handleError(response.data.error);
        break;
      case ServerResponse.NOT_FOUND:
        handleError(response.data.error);
        store.dispatch(redirectToRoute(AppRoutes.NotAvailable));
        break;
    }
  }

  if (error.message === NO_CONNECTION) {
    handleError(NO_CONNECTION_MESSAGE);
  }
};
