import { Cities, PlaceCard } from '../../const';
import { SingleOffer } from '../../types/types';
import HotelCard from '../general/hotel-card';

function FavoritesCards (props: {accommodationsFavorite: SingleOffer[]}): JSX.Element {
  const {accommodationsFavorite} = props;

  const isCityFavorite = (town:Cities): [boolean, [] | SingleOffer[]] => {
    if (accommodationsFavorite.find((line) => line.city.name === town)) {
      const addresses = accommodationsFavorite.filter((line) => line.city.name === town);
      return [true, addresses];
    } else { return [false, []];}
  };

  return(
    <ul className="favorites__list">
      { Object.values(Cities).map((city) => isCityFavorite(city)[0] &&

        <li className="favorites__locations-items">

          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>{city}</span>
              </a>
            </div>
          </div>

          <div className="favorites__places">
            {
              isCityFavorite(city)[0] === true
                ? isCityFavorite(city)[1].map((line) =>  <HotelCard accommodationInfo={line} cardKind={PlaceCard.Favorites} key={line.id}/>)
                : ''
            }
          </div>

        </li>)}
    </ul>
  );
}

export default FavoritesCards;
