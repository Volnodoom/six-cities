import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { ActionTypes } from '../../types/action-types';
import { reducerRoot } from '../reducer-root';


type Reducer = ReturnType<typeof reducerRoot>;

export const redirect: Middleware<unknown, Reducer> =
(_store) =>
  (next) =>
    (action) => {
      if (action.type === ActionTypes.redirect) {
        browserHistory.push(action.payload);
      }

      return next(action);
    };

