import { useParams } from 'react-router-dom';
import { IdParam } from '../../types/types';
import Header from '../general/header';
import HotelCard from '../general/hotel-card/hotel-card';
import PropertyCommentForm from './property-comment-form';
import PropertyContent from './property-content';
import PropertyImg from './property-img';
import PropertyReviewBox from './property-review-box';
import * as selectorUser from '../../store/data-user/user-selector';
import * as selectorProperty from '../../store/data-property/property-selector';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LIMITED_NUMBER_OF_PHOTOS, LIMITED_NUMBER_OF_REVIEWS, LoadingStatus, MapClassName, PlaceCard } from '../../const';
import { isCheckedAuth } from '../../utils/utils-components';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchPropertyDataAction } from '../../store/data-property/data-property';
import MapComponent from '../map/map-component';

function Property (): JSX.Element {
  const authorizationStatus = useSelector(selectorUser.getAuthorizationStatus);
  const isAuthorized = useSelector(selectorUser.getIsAuthorized);
  const isPropertyLoaded = useSelector(selectorProperty.getPropertyLoadingStatus) === LoadingStatus.Succeeded;
  const {id} = useParams<IdParam>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyDataAction(Number(id)));
    }
  },[dispatch, id]);

  const accommodation = useSelector(selectorProperty.getProperty);
  const reviews = useSelector(selectorProperty.getReviews);
  const nearestAccommodations = useSelector(selectorProperty.getNearbyOffers);

  if (isCheckedAuth(authorizationStatus) || !isPropertyLoaded || !accommodation) {
    return(
      <LoadingScreen />
    );
  }

  const {propertyPhotos, isPremium} = accommodation;

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
                  {
                    reviews.length > 0
                      ? reviews
                        .slice()
                        .sort((a, b) => Date.parse(String(b.reviewDate)) - Date.parse(String(a.reviewDate)))
                        .splice(0, LIMITED_NUMBER_OF_REVIEWS)
                        .map((line) => <PropertyReviewBox review={line} key={line.id}/>)
                      : <li className="reviews__item">No reviews have been published yet.</li>
                  }
                </ul>
                {isAuthorized && <PropertyCommentForm/>}
              </section>
            </div>
          </div>
          <MapComponent mapKind={MapClassName.Property} />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearestAccommodations
                .map((line) => <HotelCard accommodationInfo={line} cardKind={PlaceCard.Property} key={line.id}/>)}
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}

export default Property;
