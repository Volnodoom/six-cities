import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { ActionTypes } from '../../types/action-types';
import { reducer } from '../reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
(_store) =>
  (next) =>
    (action) => {
      if (action.type === ActionTypes.redirect) {
        browserHistory.push(action.payload);
      }

      return next(action);
    };

