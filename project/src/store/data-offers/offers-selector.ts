import { createSelector } from 'reselect';
import { Cities, SortingLabel } from '../../const';
import { State } from '../../types/state';
import { SingleOffer } from '../../types/types';
import { filterOffersForCity, getOffersAccordingSortType } from '../../utils/utils-components';

export const getOffers = (state: State): SingleOffer[] | [] => state.DATA_OFFERS.listOffers;
export const getSortType = (state: State): SortingLabel => state.DATA_OFFERS.sortType;
export const getCurrentCity = (state: State): Cities => state.DATA_OFFERS.currentCity;
export const getOffersLoadingStatus = (state: State): string | null => state.DATA_OFFERS.loadingOffersStatus;
export const getOffersError = (state: State): string | null => state.DATA_OFFERS.errorOffers;

export const getOffersForCity = createSelector (
  [
    getOffers,
    getCurrentCity,
    getSortType,

  ], (offers, city, sortType) =>  getOffersAccordingSortType(sortType, filterOffersForCity(city, offers)),
);
