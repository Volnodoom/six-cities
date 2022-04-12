import { AuthorizationStatus, LoadingStatus } from '../../const';
import { dataUser, requireAuthorization } from './data-user';

const initialState = {
  userInformation: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  loadingUserStatus: LoadingStatus.Idle,
  errorUser: null,
};
describe('Reducer: dataUser', () => {

  it('should update user`s status (authorizationStatus) in userData to "AUTH"', () => {
    expect(dataUser.reducer(initialState, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({...initialState, authorizationStatus: AuthorizationStatus.Auth});
  });
});
