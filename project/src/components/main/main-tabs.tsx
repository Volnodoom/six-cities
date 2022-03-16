import { MouseEvent } from 'react';
import { Cities } from '../../const';


type MainTabsProps = {
  selectedPlace:Cities,
  onSelection: (town:Cities) => void,
}

function MainTabs (props: MainTabsProps): JSX.Element {
  const {selectedPlace, onSelection} = props;
  const citiesArray = Object.values(Cities);

  const handleCitySelection = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    const selectedCity = (evt.target as HTMLSpanElement).textContent;
    if (selectedCity !== null ) {
      const index = citiesArray.findIndex((line) => line === selectedCity);
      if (index >= 0) {
        onSelection(citiesArray[index]);
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
                  className={`${selectedPlace === city ? 'tabs__item--active' : ''} locations__item-link tabs__item`}
                  onClick={handleCitySelection}
                >
                  <span>{city}</span>
                </a>
              </li>))}
        </ul>
      </section>
    </div>
  );
}

export default MainTabs;
