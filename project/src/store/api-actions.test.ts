import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore } from '@jedmao/redux-mock-store';
import { api } from './index';
import { State } from '../types/state';
import { Action } from 'redux';
import { checkAuthAction, clearErrorAction, fetchUserDataAction, loginAction, logoutAction } from './api-actions';
import { APIRoutes, AUTH_TOKEN_KEY_NAME, ConstantForMocks } from '../const';
import { requireAuthorization, setLoadingUserStatus, userInformation } from './data-user/data-user';
import { mockRawUser, mockUser } from '../utils/mock-user';
import { AuthData, UserData } from '../types/user-info-type';
import { redirectToRoute } from './action';
import { adaptUserInfoToClient } from '../services/adapters';
import { actions } from '../utils/utils-test';

describe('API actions', () => {
  const mockAPI = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middleware);

  it('should dispatch authorization status as "AUTH" when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoutes.Login)
      .reply(ConstantForMocks.RequestFulfilled, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(actions(store)).toContain(requireAuthorization.toString());

  });

  it('should dispatch authorization status as "NO_AUTH" when server return status 4**', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoutes.Login)
      .reply(ConstantForMocks.RequestUnauthorized, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(actions(store)).toContain(setLoadingUserStatus.toString());
    expect(actions(store)).toContain(requireAuthorization.toString());

  });

  it('should post login data, if return 200 then save token, authorize user and redirect to main page', async () => {
    const store = mockStore();
    const tokenMock = mockUser().token;
    const fakeUser: AuthData = {password: mockUser().token, login: mockUser().email};

    Storage.prototype.setItem = jest.fn();

    mockAPI
      .onPost(APIRoutes.Login)
      .reply(ConstantForMocks.RequestFulfilled, {token: tokenMock});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction(fakeUser));

    expect(actions(store)).toContain(requireAuthorization.toString());
    expect(actions(store)).toContain(redirectToRoute.toString());

    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(AUTH_TOKEN_KEY_NAME, tokenMock);
  });

  it('should return Error info about post login data, when server return status 4**', async () => {
    const store = mockStore();
    const fakeUser: AuthData = {password: mockUser().token, login: mockUser().email};

    mockAPI
      .onPost(APIRoutes.Login)
      .reply(ConstantForMocks.RequestBadRequest, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction(fakeUser));

    expect(actions(store)).toContain(requireAuthorization.toString());
    expect(actions(store)).toContain(setLoadingUserStatus.toString());
    expect(actions(store)).not.toContain(redirectToRoute.toString());
  });

  it('should logout if return 204 then remove token and switch to UNauthorize (NO_AUTH) status', async () => {
    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    mockAPI
      .onDelete(APIRoutes.Logout)
      .reply(ConstantForMocks.LogoutFulfilled, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logoutAction());

    expect(actions(store)).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith(AUTH_TOKEN_KEY_NAME);
  });

  it('should return Error info about logout when server return status 4**', async () => {
    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    mockAPI
      .onDelete(APIRoutes.Logout)
      .reply(ConstantForMocks.RequestBadRequest, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logoutAction());

    expect(actions(store)).toContain(setLoadingUserStatus.toString());
    expect(actions(store)).not.toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).not.toHaveBeenCalledTimes(1);
    expect(Storage.prototype.removeItem).not.toHaveBeenCalledWith(AUTH_TOKEN_KEY_NAME);
  });

  it('should update userInformation when return 200', async () => {
    const store = mockStore();
    const fakeRawUser = mockRawUser();
    const fakeUser = () => {
      const result = {...fakeRawUser, avatar: fakeRawUser.avatarUrl};
      delete result.avatarUrl;
      return result as UserData;
    };

    mockAPI
      .onGet(APIRoutes.Login)
      .reply(ConstantForMocks.LogoutFulfilled, {fakeRawUser});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchUserDataAction());
    expect(adaptUserInfoToClient(fakeRawUser)).toEqual(fakeUser());
    expect(actions(store)).toContain(userInformation.toString());
  });

  it('should return Error info about userInformation when server return status 4**', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoutes.Login)
      .reply(ConstantForMocks.RequestBadRequest, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchUserDataAction());
    expect(actions(store)).toContain(setLoadingUserStatus.toString());
    expect(actions(store)).not.toContain(userInformation.toString());
  });

  it('should clear error log data', async () => {
    const store = mockStore();

    jest.spyOn(global, 'setTimeout');
    expect(store.getActions()).toEqual([]);
    jest.runAllTimers();
    await store.dispatch(clearErrorAction());

    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});
