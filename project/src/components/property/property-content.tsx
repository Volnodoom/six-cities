import { useSelector } from 'react-redux';
import * as selector from '../../store/data-property/property-selector';
import { SingleOffer } from '../../types/types';
import FavoriteButton from '../general/favorite-button';
import StarRating from '../general/star-rating';

function PropertyContent (): JSX.Element {
  const accommodation = useSelector(selector.getProperty) as SingleOffer;

  const {
    id,
    title,
    isFavorite,
    rating,
    bedrooms,
    adultsNumber,
    accommodationType,
    description,
    goods,
    price,
  } = accommodation;

  const {
    avatarImg,
    isPro,
    name,
  } = accommodation.host;

  return(
    <>
      <div className="property__name-wrapper">
        <h1 className="property__name">{title}</h1>
        <FavoriteButton isPropertyPage id={id} toggle={isFavorite}/>
      </div>

      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <StarRating rating={rating} />
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">{rating}</span>
      </div>

      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {accommodationType.replace(accommodationType[0], accommodationType[0].toUpperCase())}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {bedrooms} Bedrooms
        </li>
        <li className="property__feature property__feature--adults">
                  Max {adultsNumber} adults
        </li>
      </ul>

      <div className="property__price">
        <b className="property__price-value">&euro;{price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>

      <div className="property__inside">
        <h2 className="property__inside-title">What&apos;s inside</h2>
        <ul className="property__inside-list">
          {goods.map((item) => <li className="property__inside-item" key={`${item}-${Date.parse(String(new Date()))}`}>{item}</li>)}
        </ul>
      </div>

      <div className="property__host">
        <h2 className="property__host-title">Meet the host</h2>
        <div className="property__host-user user">
          <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
            <img className="property__avatar user__avatar" src={avatarImg} width="74" height="74" alt="Host avatar." />
          </div>
          <span className="property__user-name">{name}</span>
          {isPro ? <span className="property__user-status">Pro</span> : ''}
        </div>

        <div className="property__description">
          <p className="property__text">{description}</p>
        </div>
      </div>
    </>
  );
}

export default PropertyContent;
