import { LoadingStatus, PlaceCard } from '../../const';
import HotelCard from '../general/hotel-card/hotel-card';
import * as selector from '../../store/data-favorites/favorite-selector';
import { useSelector } from 'react-redux';
import { filterFavoritesByCity } from '../../utils/utils-components';
import LoadingScreen from '../loading-screen/loading-screen';


function FavoritesCards (): JSX.Element {
  const favoritesData = useSelector(selector.getFavorites);
  const FavoriteFiltratedData = filterFavoritesByCity(favoritesData);
  const isUpdateFinished = useSelector(selector.getFavoriteLoadingStatus) === LoadingStatus.Succeeded;

  if(!isUpdateFinished) {
    return <LoadingScreen />;
  }

  return(
    <>
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          FavoriteFiltratedData.map(([city, offerDetails]) => offerDetails.length > 0 &&
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {
              offerDetails.map((line) =>
                (
                  <HotelCard
                    accommodationInfo={line}
                    cardKind={PlaceCard.Favorites}
                    key={line.id}
                  />
                ),
              )
            }
          </div>
        </li>,
          )
        }
      </ul>
    </>
  );
}

export default FavoritesCards;
