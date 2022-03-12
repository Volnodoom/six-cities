import MainTabs from './main-tabs';
import HotelCard from '../general/hotel-card';
import Header from '../general/header';
import { PlaceCard, Cities } from '../../const';
import { SingleOffer } from '../../types/types';
import { useState } from 'react';
import { filterCity } from '../../utils/utils-components';

function Main (props: {accommodations: SingleOffer[]}): JSX.Element {
  const {accommodations} = props;
  const [currentCity, setCurrentCity] = useState(Cities.Paris);

  return(
    <div className="page page--gray page--main">
      <Header mainPage/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <MainTabs selectedPlace={currentCity} onSelection={(town:Cities) => setCurrentCity(town)} />
        <div className="cities">
          {/* place for the logic of main-no-card it should replace the follow div*/}
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filterCity(currentCity, accommodations).length} places to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {filterCity(currentCity, accommodations).map((offer) => <HotelCard accommodationInfo={offer} cardKind={PlaceCard.Main} key={offer.id}/>)}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
