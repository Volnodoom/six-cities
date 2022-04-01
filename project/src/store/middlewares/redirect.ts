import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { REDIRECT_GLOBAL } from '../../const';
import { reducerRoot } from '../reducer-root';

type Reducer = ReturnType<typeof reducerRoot>;

export const redirect: Middleware<unknown, Reducer> =
(_store) =>
  (next) =>
    (action) => {
      if (action.type === REDIRECT_GLOBAL) {
        browserHistory.push(action.payload);
      }

      return next(action);
    };

