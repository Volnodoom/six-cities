import {configureMockStore} from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import { AppRoutes, ConstantForMocks } from '../../const';
import { State } from '../../types/state';
import { redirectToRoute } from '../action';
import { redirect } from './redirect';

const fakeHistory = ({
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
});

jest.mock('../../browser-history', () => fakeHistory);

const middleware = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middleware);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
    store.clearActions();
  });
  it('should be redirect to / (root)', () => {
    store.dispatch(redirectToRoute(AppRoutes.Root));
    expect(fakeHistory.location.pathname).toBe(AppRoutes.Root);
    expect(store.getActions()).toEqual([redirectToRoute(AppRoutes.Root)]);
  });

  it('should be redirect to NotAvailable page', () => {
    store.dispatch(redirectToRoute(AppRoutes.NotAvailable));
    expect(fakeHistory.location.pathname).toBe(AppRoutes.NotAvailable);
    expect(store.getActions()).toEqual([redirectToRoute(AppRoutes.NotAvailable)]);
  });

  it('should not be redirected to / (root)', () => {
    store.dispatch({type: ConstantForMocks.UnknownAction.type, payload: AppRoutes.Root});
    expect(fakeHistory.location.pathname).not.toBe(AppRoutes.Root);
  });

});
