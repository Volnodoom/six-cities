import { createAction } from '@reduxjs/toolkit';
import { REDIRECT_GLOBAL } from '../const';

export const redirectToRoute = createAction<string>(REDIRECT_GLOBAL);
