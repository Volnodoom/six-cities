import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataOffers } from './data-offers/data-offers';
import { dataProperty } from './data-property/data-property';
import { dataUser } from './data-user/data-user';

export const reducerRoot = combineReducers({
  [NameSpace.DataOffers]: dataOffers.reducer,
  [NameSpace.DataProperty]: dataProperty.reducer,
  [NameSpace.DataUser]: dataUser.reducer,
});
