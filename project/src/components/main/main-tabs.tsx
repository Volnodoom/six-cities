import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentCity } from '../../store/data-offers/data-offers';
import * as selector from '../../store/data-offers/offers-selector';
import { cityList } from '../../utils/utils-components';


function MainTabs (): JSX.Element {
  const dispatch = useDispatch();
  const selectedTown = useSelector(selector.getCurrentCity);

  const handleCitySelection = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    const selectedCity = (evt.target as HTMLSpanElement).dataset.cityname;
    if (selectedCity !== null ) {
      const index = cityList.findIndex((line) => line === selectedCity);
      if (index >= 0) {
        dispatch(currentCity(cityList[index]));
      }
    }
  };

  return(
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cityList
            .slice()
            .splice(0, cityList.length)
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
