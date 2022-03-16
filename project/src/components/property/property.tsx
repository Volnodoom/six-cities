import { Navigate, useParams } from 'react-router-dom';
import { AppRoutes, LIMITED_NUMBER_OF_NEAREST_ACCOMMODATIONS, LIMITED_NUMBER_OF_PHOTOS, LIMITED_NUMBER_OF_REVIEWS, MapClassName, PlaceCard } from '../../const';
import { IdParam, SingleOffer, SingleReview } from '../../types/types';
import { filterCity } from '../../utils/utils-components';
import Header from '../general/header';
import HotelCard from '../general/hotel-card/hotel-card';
import StarRating from '../general/star-rating';
import Map from '../map/map';
import PropertyCommentForm from './property-comment-form';
import PropertyImg from './property-img';
import PropertyReviewBox from './property-review-box';

function Property (props: {accommodations: SingleOffer[], reviews: SingleReview[]}): JSX.Element {
  const {accommodations, reviews} = props;
  const {id} = useParams<IdParam>();
  const accommodation = accommodations.find((line) => String(line.id) === id);

  if (accommodation === undefined) {
    return <Navigate to={AppRoutes.NotAvailable}/>;
  }

  const {
    propertyPhotos,
    isPremium,
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

  const cityName = accommodation.city.name;
  const idCard = accommodation.id;
  const nearestAccommodations = filterCity(cityName, accommodations).splice(0, LIMITED_NUMBER_OF_NEAREST_ACCOMMODATIONS);

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">

          <div className="property__gallery-container container">
            <div className="property__gallery">
              {propertyPhotos
                .slice()
                .splice(0, LIMITED_NUMBER_OF_PHOTOS)
                .map((line) => <PropertyImg urlImg={line} key={`${line}-${Date.parse(String(new Date()))}`}/>)}
            </div>
          </div>

          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? <div className="property__mark"><span>Premium</span></div> : ''}

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

              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;
                  <span className="reviews__amount">
                    {reviews.length > LIMITED_NUMBER_OF_REVIEWS ? '10' : reviews.length}
                  </span>
                </h2>
                <ul className="reviews__list">
                  {reviews
                    .sort((a, b) => Date.parse(String(b.reviewDate)) - Date.parse(String(a.reviewDate)))
                    .slice()
                    .splice(0, LIMITED_NUMBER_OF_REVIEWS)
                    .map((line) => <PropertyReviewBox review={line} key={line.id}/>)}
                </ul>
                <PropertyCommentForm/>
              </section>

            </div>
          </div>
          <Map positionClass={MapClassName.Property} accommodations={nearestAccommodations} town={accommodation}/>
        </section>

        <div className="container">

          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearestAccommodations
                .map((line) => <HotelCard accommodationInfo={line} cardKind={PlaceCard.Property} key={idCard}/>)}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default Property;
