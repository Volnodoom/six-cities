import { Navigate, useParams } from 'react-router-dom';
import { IdParam, SingleOffer } from '../../types/types';
import Header from '../general/header';
import HotelCard from '../general/hotel-card/hotel-card';
import Map from '../map/map';
import PropertyCommentForm from './property-comment-form';
import PropertyContent from './property-content';
import PropertyImg from './property-img';
import PropertyReviewBox from './property-review-box';
import {
  AppRoutes,
  LIMITED_NUMBER_OF_NEAREST_ACCOMMODATIONS,
  LIMITED_NUMBER_OF_PHOTOS,
  LIMITED_NUMBER_OF_REVIEWS,
  MapClassName,
  PlaceCard
} from '../../const';
import * as selector from '../../store/selector';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetReviewsAction, fetchPropertyAction } from '../../store/api-actions';

function Property (): JSX.Element {
  const {id} = useParams<IdParam>();
  const dispatch = useDispatch();
  dispatch(fetchGetReviewsAction(Number(id)));

  const accommodationFromFetch = useSelector(selector.getProperty);
  const reviews = useSelector(selector.getReviews);
  const nearestAccommodations = useSelector(selector.getNearbyOffers)
    .splice(0, LIMITED_NUMBER_OF_NEAREST_ACCOMMODATIONS);

  const accommodations = useSelector(selector.getOffers);
  const accommodationFromList = accommodations.find((line) => String(line.id) === id);

  let accommodation: SingleOffer | null;
  if (accommodationFromList && id) {
    accommodation = accommodationFromList;
  } else if (accommodations === [] && id) {
    dispatch(fetchPropertyAction(Number(id)));
    accommodation = accommodationFromFetch;
  } else {
    return <Navigate to={AppRoutes.NotAvailable}/>;
  }

  if (!accommodation) {
    return <Navigate to={AppRoutes.NotAvailable}/>;
  }

  const {propertyPhotos, isPremium} = accommodation;
  const idCard = accommodation.id;

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
                .map((line) => <PropertyImg urlImg={line} key={line}/>)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? <div className="property__mark"><span>Premium</span></div> : ''}
              <PropertyContent accommodation={accommodation}/>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;
                  <span className="reviews__amount">
                    {reviews.length > LIMITED_NUMBER_OF_REVIEWS ? LIMITED_NUMBER_OF_REVIEWS : reviews.length}
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
          <Map positionClass={MapClassName.Property} propertyTownInfo={accommodation}/>
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
