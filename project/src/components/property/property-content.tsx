import { SingleOffer } from '../../types/types';
import StarRating from '../general/star-rating';

function PropertyContent (props: {accommodation: SingleOffer}): JSX.Element {
  const {
    title,
    isFavorite,
    rating,
    bedrooms,
    adultsNumber,
    accommodationType,
    description,
    goods,
    price,
  } = props.accommodation;

  const {
    avatarImg,
    isPro,
    name,
  } = props.accommodation.host;

  return(
    <>
      <div className="property__name-wrapper">
        <h1 className="property__name">{title}</h1>
        <button className={`${isFavorite ? 'property__bookmark-button--active button' : ''} property__bookmark-button button`} type="button">
          <svg className="property__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
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
