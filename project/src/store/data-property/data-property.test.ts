import { LoadingStatus } from '../../const';
import { makeFakeSingleOffer } from '../../utils/mock-single-offer';
import { dataProperty, setProperty, updateFavoriteInProperty } from './data-property';

const initialState = {
  property: null,
  reviews: [],
  nearbyOffers: [],
  loadingPropertyStatus: LoadingStatus.Idle,
  errorProperty: null,
  loadingReviewStatus: LoadingStatus.Idle,
};

const data = makeFakeSingleOffer();
// const stateForCurrentPage = {
//   ...initialState,
//   property : data,
// };
const stateForCurrentPage = {
  reviews: [],
  nearbyOffers: [],
  loadingPropertyStatus: LoadingStatus.Idle,
  errorProperty: null,
  loadingReviewStatus: LoadingStatus.Idle,
  property : data,
};


describe('Reducer: dataProperty', () => {

  it('should update property in DataProperty by setting data with type SingleOffer', () => {
    expect(dataProperty.reducer(initialState, setProperty(data)))
      .toEqual({...initialState, property: data});
  });

  it('should update favorite field of property in DataProperty by setting favorite to opposite of current boolean value', () => {
    expect(dataProperty.reducer(stateForCurrentPage, updateFavoriteInProperty()))
      .toEqual({
        reviews: [],
        nearbyOffers: [],
        loadingPropertyStatus: LoadingStatus.Idle,
        errorProperty: null,
        loadingReviewStatus: LoadingStatus.Idle,
        property: {
          ...data,
          isFavorite: !data.isFavorite,
        },
      });
  });
  // it('should update authorizationStatus in DataUser by setting data with type AuthorizationStatus', () => {
  //   expect(dataUser.reducer(initialState2, requireAuthorization(AuthorizationStatus.Auth)))
  //     .toEqual(
  //       {...initialState2, authorizationStatus: AuthorizationStatus.Auth},
  //     );
  // });
});

