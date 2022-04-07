import { MouseEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapClassName,PlaceCard, SortingLabel } from '../../const';
import { HighlightCardInfo } from '../../types/types';
import * as selector from '../../store/data-offers/offers-selector';
import HotelCard from '../general/hotel-card/hotel-card';
import MapComponent from '../map/map-component';
import { currentSort } from '../../store/data-offers/data-offers';

function MainContent (): JSX.Element {
  const dispatch = useDispatch();
  const cityAccommodations = useSelector(selector.getOffersForCity);
  const sortType = useSelector(selector.getSortType);

  const [mouseEnteredCard, setMouseEnteredCard] = useState<HighlightCardInfo | null>(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const ulRef = useRef<HTMLUListElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  const getSortClassName = (elementLabel: SortingLabel) => `places__option ${sortType === elementLabel && 'places__option--active'}`;
  const sortLabels = Object.values(SortingLabel);


  const handleSort = (evt: MouseEvent<HTMLLIElement>) => {
    const sortName = (evt.target as HTMLLIElement).dataset.sortoption as SortingLabel;
    sortName && dispatch(currentSort(sortName));
  };

  const handleSortBehavior = (evt: MouseEvent<HTMLElement>) => {
    if (
      (evt.target as HTMLLinkElement).closest('.places__options') === ulRef.current ||
      (evt.target as HTMLSpanElement) === spanRef.current ||
      (evt.target as HTMLSpanElement).previousElementSibling === spanRef.current
    ) {
      setIsOptionSelected(!isOptionSelected);
    } else {setIsOptionSelected(false);}
  };

  const handleCardHighlight = (offerCard: HighlightCardInfo | null) => setMouseEnteredCard(offerCard);

  return(
    <div className="cities__places-container container" onClick={handleSortBehavior}>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cityAccommodations.length} places to stay in {cityAccommodations[0].city.name}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption" ref={spanRef}>Sort by </span>
          <span className="places__sorting-type" tabIndex={0}>
            {sortType}
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className={`places__options places__options--custom ${isOptionSelected && 'places__options--opened'}`} ref={ulRef}>
            {sortLabels
              .map((line) => (
                <li className={getSortClassName(line)}
                  onClick={handleSort}
                  tabIndex={0}
                  key={line}
                  data-sortoption={line}
                >{line}
                </li>))}
          </ul>
        </form>

        <div className="cities__places-list places__list tabs__content">
          {cityAccommodations
            .map((offer) => (
              <HotelCard
                onMouseIn={handleCardHighlight}
                accommodationInfo={offer}
                cardKind={PlaceCard.Main}
                key={offer.id}
              />))}
        </div>

      </section>
      <div className="cities__right-section">
        <MapComponent mapKind={MapClassName.Main} highlightedCardMain={mouseEnteredCard}/>
      </div>
    </div>
  );
}

export default MainContent;
