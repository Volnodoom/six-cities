import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MapClassName,PlaceCard, SortingLabel } from '../../const';
import { HighlightCardInfo } from '../../types/types';
import * as selector from '../../store/selector';
import HotelCard from '../general/hotel-card/hotel-card';
import { sortHighToLow, sortLowToHigh, sortTopRate } from '../../utils/utils-components';
import MapComponent from '../map/map-component';

function MainContent (): JSX.Element {
  const cityAccommodations = useSelector(selector.getOffersForCity);
  const [currentSortType, setCurrentSortType] = useState(SortingLabel.Popular);

  const [mouseEnteredCard, setMouseEnteredCard] = useState<HighlightCardInfo | null>(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const ulRef = useRef<HTMLUListElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  const getSortClassName = (elementLabel: SortingLabel) => `places__option ${currentSortType === elementLabel && 'places__option--active'}`;
  const sortLabels = Object.values(SortingLabel);

  useEffect(() => {
    setCurrentSortType(SortingLabel.Popular);
  }, [cityAccommodations]);

  const handleSort = (evt: MouseEvent<HTMLLIElement>) => {
    const sortName = (evt.target as HTMLLIElement).textContent as SortingLabel;
    sortName && setCurrentSortType(sortName);
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

  const getOffersAccordingSort = (kind:SortingLabel) => {
    switch (kind) {
      case SortingLabel.Low:
        return sortLowToHigh(cityAccommodations);
      case SortingLabel.High:
        return sortHighToLow(cityAccommodations);
      case SortingLabel.TopRate:
        return sortTopRate(cityAccommodations);
      default:
        return cityAccommodations;
    }
  };

  return(
    <div className="cities__places-container container" onClick={handleSortBehavior}>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cityAccommodations.length} places to stay in {cityAccommodations[0].city.name}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption" ref={spanRef}>Sort by </span>
          <span className="places__sorting-type" tabIndex={0}>
            {currentSortType}
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
                >{line}
                </li>))}
          </ul>
        </form>

        <div className="cities__places-list places__list tabs__content">
          {getOffersAccordingSort(currentSortType)
            .map((offer) => (
              <HotelCard
                onMouseIn={(offerCard: HighlightCardInfo | null) => setMouseEnteredCard(offerCard)}
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
