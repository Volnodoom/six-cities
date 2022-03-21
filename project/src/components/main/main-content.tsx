import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MapClassName, PlaceCard } from '../../const';
import { AccommodationLocation } from '../../types/types';
import * as selector from '../../store/selector';
import HotelCard from '../general/hotel-card/hotel-card';
import Map from '../map/map';


function MainContent (): JSX.Element {
  const cityAccommodations = useSelector(selector.getOffersForCity);
  const [mouseEnteredCard, setMouseEnteredCard] = useState<AccommodationLocation | null>(null);

  return(
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cityAccommodations.length} places to stay in {cityAccommodations[0].city.name}</b>
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
          {cityAccommodations
            .map((offer) => (
              <HotelCard
                onMouseIn={(offerCard: AccommodationLocation | null) => setMouseEnteredCard(offerCard)}
                accommodationInfo={offer}
                cardKind={PlaceCard.Main}
                key={offer.id}
              />))}
        </div>

      </section>
      <div className="cities__right-section">
        <Map positionClass={MapClassName.Main} pointedCard={mouseEnteredCard}/>
      </div>
    </div>
  );
}

export default MainContent;
