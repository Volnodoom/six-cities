import { AuthorizationStatus, ConstantForMocks, LoadingStatus } from '../../const';
import { mockError } from '../../utils/mock-error';
import { mockUser } from '../../utils/mock-user';
import { dataUser, requireAuthorization, setErrorUser, setLoadingUserStatus, userInformation } from './data-user';

const initialState = {
  userInformation: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  loadingUserStatus: LoadingStatus.Idle,
  errorUser: null,
};

const mockedData = mockUser();
const mockedError = mockError();
describe('Reducer: dataUser', () => {

  it('should return initial state with unknown action', () => {
    expect(dataUser.reducer(void 0, ConstantForMocks.UnknownAction))
      .toEqual(initialState);
  });

  it('should update user`s status (authorizationStatus) to "AUTH"', () => {
    expect(dataUser.reducer(initialState, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({...initialState, authorizationStatus: AuthorizationStatus.Auth});
  });

  it('should update user`s status (authorizationStatus) to "NO_AUTH"', () => {
    expect(dataUser.reducer(initialState, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({...initialState, authorizationStatus: AuthorizationStatus.NoAuth});
  });

  it('should update userInformation', () => {
    expect(dataUser.reducer(initialState, userInformation(mockedData)))
      .toEqual({...initialState, userInformation: mockedData});
  });

  it('should update errorUser on error string', () => {
    expect(dataUser.reducer(initialState, setErrorUser(mockedError)))
      .toEqual({...initialState, errorUser: mockedError});
  });

  it('should clear errorUser with empty string ""', () => {
    expect(dataUser.reducer(initialState, setErrorUser('')))
      .toEqual({...initialState, errorUser: ''});
  });

  it('should update loading status on pending', () => {
    expect(dataUser.reducer(initialState, setLoadingUserStatus(LoadingStatus.Loading)))
      .toEqual({...initialState, loadingUserStatus: LoadingStatus.Loading});
  });

  it('should update loading status on succeed', () => {
    expect(dataUser.reducer(initialState, setLoadingUserStatus(LoadingStatus.Succeeded)))
      .toEqual({...initialState, loadingUserStatus: LoadingStatus.Succeeded});
  });

  it('should update loading status on rejected', () => {
    expect(dataUser.reducer(initialState, setLoadingUserStatus(LoadingStatus.Failed)))
      .toEqual({...initialState, loadingUserStatus: LoadingStatus.Failed});
  });

});
