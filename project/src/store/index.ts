import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirect } from './middlewares/redirect';
import { reducerRoot } from './reducer-root';

export const api = createAPI();
export const store = configureStore({
  reducer: reducerRoot,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
