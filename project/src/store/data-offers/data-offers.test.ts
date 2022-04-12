import { Cities, ConstantForMocks, LoadingStatus, SortingLabel } from '../../const';
import { makeFakeSingleOffer } from '../../utils/mock-single-offer';
import { dataOffers, listOffers } from './data-offers';

const initialState = {
  listOffers: [],
  currentCity: Cities.Paris,
  sortType: SortingLabel.Popular,
  listOffersForCity: [],
  errorOffers: null,
  loadingOffersStatus: LoadingStatus.Idle,
};

const mockedData = Array(ConstantForMocks.ArraySize).fill(makeFakeSingleOffer());
describe('Reducer: dataOffers', () => {

  it('should update line "listOffers" with array of data', () => {
    expect(dataOffers.reducer(initialState, listOffers(mockedData)))
      .toEqual({...initialState, listOffers: mockedData});
  });
});
