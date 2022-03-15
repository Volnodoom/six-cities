import MainTabs from './main-tabs';
import Header from '../general/header';
import { Cities } from '../../const';
import { SingleOffer } from '../../types/types';
import { useState } from 'react';
import { filterCity } from '../../utils/utils-components';
import MainEmpty from './main-empty';
import MainContent from './main-content';

function Main (props: {accommodations: SingleOffer[]}): JSX.Element {
  const {accommodations} = props;
  const [currentCity, setCurrentCity] = useState(Cities.Paris);
  const cityAccommodations = filterCity(currentCity, accommodations);

  return(
    <div className="page page--gray page--main">
      <Header mainPage/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <MainTabs selectedPlace={currentCity} onSelection={(town:Cities) => setCurrentCity(town)} />
        <div className="cities">
          {
            cityAccommodations.length === 0
              ? <MainEmpty cityName={currentCity}/>
              : <MainContent cityAccommodations={cityAccommodations}/>
          }
        </div>
      </main>
    </div>
  );
}

export default Main;
