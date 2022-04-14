import { Cities, ConstantForMocks, LoadingStatus, SortingLabel } from '../../const';
import { DataOffers } from '../../types/state';
import { makeFakeSingleOffer } from '../../utils/mock-single-offer';
import { dataOffers, listOffers } from './data-offers';

const initialState: DataOffers = {
  listOffers: [],
  currentCity: Cities.Paris,
  sortType: SortingLabel.Popular,
  listOffersForCity: [],
  errorOffers: null,
  loadingOffersStatus: LoadingStatus.Idle,
};

const mockedData = Array(ConstantForMocks.ArraySize).fill(' ').map(() => makeFakeSingleOffer());
describe('Reducer: dataOffers', () => {

  it('should return initial state with unknown action', () => {
    expect(dataOffers.reducer(void 0, ConstantForMocks.UnknownAction))
      .toEqual(initialState);
  });

  it('should update line "listOffers" with array of data', () => {
    expect(dataOffers.reducer(initialState, listOffers(mockedData)))
      .toEqual({...initialState, listOffers: mockedData});
  });
});
