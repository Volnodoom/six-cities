import { Link } from 'react-router-dom';
import { AppRoutes, PlaceCard } from '../../const';
import { SingleOffer } from '../../types/types';
import { getStarRating } from '../../utils/utils-components';

function HotelCard (props: {cardKind: PlaceCard; accommodationInfo: SingleOffer}): JSX.Element {
  const {cardKind}=props;
  const {
    id,
    isPremium,
    propertyPreview,
    isFavorite,
    price,
    rating,
    title,
    accommodationType,
  }=props.accommodationInfo;

  let articleClassName = '';
  let divClassName = '';
  let imgParameters: number[] = [];

  switch (cardKind) {
    case PlaceCard.Main:
      articleClassName = 'cities__place-card';
      divClassName = 'cities__image-wrapper';
      imgParameters = [260, 200];
      break;
    case PlaceCard.Property:
      articleClassName = 'near-places__card';
      divClassName = 'near-places__image-wrapper';
      imgParameters = [260, 200];
      break;
    case PlaceCard.Favorites:
      articleClassName = 'favorites__card';
      divClassName = 'favorites__image-wrapper';
      imgParameters = [150, 110];
      break;
  }

  return(
    <article className={`${articleClassName} place-card`}>
      {(cardKind === PlaceCard.Main) && isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className={`${divClassName} place-card__image-wrapper`}>
        <Link to={AppRoutes.Property(id)} >
          <img className="place-card__image" src={propertyPreview} width={imgParameters[0]} height={imgParameters[1]} alt="Place" />
        </Link>
      </div>
      <div className={cardKind === PlaceCard.Favorites ? 'favorites__card-info' : 'place-card__info'}>
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
            <span style={{width: `${getStarRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/">{title}</a>
        </h2>
        <p className="place-card__type">{accommodationType}</p>
      </div>
    </article>
  );
}

export default HotelCard;
