import MainTabs from './main-tabs';
import Header from '../general/header';
// import { Cities } from '../../const';
// import { SingleOffer } from '../../types/types';
// import { useState } from 'react';
import { filterCity } from '../../utils/utils-components';
import MainEmpty from './main-empty';
import MainContent from './main-content';
import { useDispatch, useSelector } from 'react-redux';
import * as selector from '../../store/selector';
import { listOffersForCity } from '../../store/action';

function Main (): JSX.Element {
  const currentCity = useSelector(selector.getCurrentCity);
  const accommodations = useSelector(selector.getOffers);
  const dispatch = useDispatch();

  const cityAccommodations = filterCity(currentCity, accommodations);
  dispatch(listOffersForCity(cityAccommodations));

  return(
    <div className="page page--gray page--main">
      <Header mainPage/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <MainTabs />
        <div className="cities">
          {
            cityAccommodations.length === 0
              ? <MainEmpty cityName={currentCity}/>
              : <MainContent />
          }
        </div>
      </main>
    </div>
  );
}

export default Main;
