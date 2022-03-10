import { PlaceCard } from '../../const';
import HotelCard from '../general/hotel-card';

function FavoritesCard (): JSX.Element {
  return(
    <li className="favorites__locations-items">

      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>Amsterdam</span>
          </a>
        </div>
      </div>

      <div className="favorites__places">
        <HotelCard cardKind={PlaceCard.Favorites}/>
      </div>

    </li>
  );
}

export default FavoritesCard;
