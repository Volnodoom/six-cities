import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../const';
import { SingleOffer } from '../../../types/types';
import StarRating from '../star-rating';

function CardContent (props: {isFavoriteCard?: boolean; accommodationInfo: SingleOffer}): JSX.Element {
  const {isFavoriteCard}=props;
  const {
    id,
    isFavorite,
    price,
    rating,
    title,
    accommodationType,
  }=props.accommodationInfo;

  return(
    <div className={isFavoriteCard ? 'favorites__card-info' : 'place-card__info'}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>

        <button className={`${isFavorite ? 'place-card__bookmark-button--active button' : ''} place-card__bookmark-button button`} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
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
