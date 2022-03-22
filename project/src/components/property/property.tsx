import { Navigate, useParams } from 'react-router-dom';
import { IdParam, SingleOffer, SingleReview } from '../../types/types';
import { filterCity } from '../../utils/utils-components';
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
  MapClassName, PlaceCard
} from '../../const';

function Property (props: {accommodations: SingleOffer[], reviews: SingleReview[]}): JSX.Element {
  const {accommodations, reviews} = props;
  const {id} = useParams<IdParam>();
  const accommodation = accommodations.find((line) => String(line.id) === id);

  if (accommodation === undefined) {
    return <Navigate to={AppRoutes.NotAvailable}/>;
  }

  const {propertyPhotos, isPremium} = accommodation;

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
