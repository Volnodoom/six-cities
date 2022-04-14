import { MockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { State } from '../types/state';

export const actions = (store: MockStore<State, Action>) => store.getActions().map(({type}) => type);
