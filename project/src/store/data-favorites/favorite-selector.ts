import { State } from '../../types/state';

export const getFavorites = (state: State) => state.DATA_FAVORITES.favoriteOffers;
export const getFavoriteLoadingStatus = (state: State) => state.DATA_FAVORITES.loadingStatus;
export const getFavoriteError = (state: State) => state.DATA_FAVORITES.errors;

