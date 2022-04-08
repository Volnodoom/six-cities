import { AuthorizationStatus, LoadingStatus } from '../../const';
import { DataProperty, DataUser } from '../../types/state';
import { makeFakeSingleOffer } from '../../utils/mock-single-offer';
import { dataUser, requireAuthorization } from '../data-user/data-user';
import { dataProperty, setProperty } from './data-property';

const initialState = {
  property: null,
  reviews: [],
  nearbyOffers: [],
  loadingPropertyStatus: LoadingStatus.Idle,
  errorProperty: null,
  loadingReviewStatus: LoadingStatus.Idle,
};

const initialState2: DataUser = {
  userInformation: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  loadingUserStatus: LoadingStatus.Idle,
  errorUser: null,
};

// const prevState = makeFakeSingleOffer();
const data = makeFakeSingleOffer();


describe('Reducer: dataProperty', () => {

  it('should update property in DataProperty by setting data with type SingleOffer', () => {
    expect(dataProperty.reducer(initialState, setProperty(data)))
      .toEqual({...initialState, property: data});
  });
  it('should update authorizationStatus in DataUser by setting data with type AuthorizationStatus', () => {
    expect(dataUser.reducer(initialState2, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual(
        {...initialState2, authorizationStatus: AuthorizationStatus.Auth},
      );
  });
});

