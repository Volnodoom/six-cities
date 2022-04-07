import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../const';
import { SingleOffer } from '../../../types/types';
import FavoriteButton from '../favorite-button';
import StarRating from '../star-rating';

function CardContent (props: {isFavoritePage?: boolean; accommodationInfo: SingleOffer}): JSX.Element {
  const {isFavoritePage}=props;
  const {
    id,
    isFavorite,
    price,
    rating,
    title,
    accommodationType,
  } = props.accommodationInfo;

  return(
    <div className={isFavoritePage ? 'favorites__card-info' : 'place-card__info'}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <FavoriteButton id={id} toggle={isFavorite}/>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <StarRating rating={rating} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>

      <h2 className="place-card__name">
        <Link to={AppRoutes.Property(id)}>{title}</Link>
      </h2>
      <p className="place-card__type">{accommodationType}</p>
    </div>
  );
}

export default CardContent;
