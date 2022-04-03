import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cities } from '../../const';
import { currentCity } from '../../store/data-offers/data-offers';
import * as selector from '../../store/data-offers/offers-selector';


function MainTabs (): JSX.Element {
  const citiesArray = Object.values(Cities);

  const dispatch = useDispatch();
  const selectedTown = useSelector(selector.getCurrentCity);

  const handleCitySelection = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    const selectedCity = (evt.target as HTMLSpanElement).dataset.cityname;
    if (selectedCity !== null ) {
      const index = citiesArray.findIndex((line) => line === selectedCity);
      if (index >= 0) {
        dispatch(currentCity(citiesArray[index]));
      }
    }
  };

  return(
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {citiesArray
            .slice()
            .splice(0, citiesArray.length)
            .map((city) => (
              <li className="locations__item" key={city}>
                <a
                  href="#nowhere"
                  className={`${selectedTown === city ? 'tabs__item--active' : ''} locations__item-link tabs__item`}
                  onClick={handleCitySelection}
                  data-cityname={city}
                >
                  <span data-cityname={city}>{city}</span>
                </a>
              </li>))}
        </ul>
      </section>
    </div>
  );
}

export default MainTabs;
