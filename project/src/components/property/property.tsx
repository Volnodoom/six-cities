import { Navigate, useParams } from 'react-router-dom';
import { IdParam
  // SingleOffer
} from '../../types/types';
import Header from '../general/header';
// import HotelCard from '../general/hotel-card/hotel-card';
// import Map from '../map/map';
import PropertyCommentForm from './property-comment-form';
import PropertyContent from './property-content';
import PropertyImg from './property-img';
// import PropertyReviewBox from './property-review-box';
import * as selector from '../../store/selector';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  AppRoutes,
  // LIMITED_NUMBER_OF_NEAREST_ACCOMMODATIONS,
  LIMITED_NUMBER_OF_PHOTOS,
  LIMITED_NUMBER_OF_REVIEWS,
  LoadingStatus
  // MapClassName,
  // PlaceCard
} from '../../const';
import { isCheckedAuth } from '../../utils/utils-components';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchPropertyDataAction } from '../../store/data-property/data-property';

function Property (): JSX.Element {
  const authorizationStatus = useSelector(selector.getAuthorizationStatus);
  const isPropertyLoaded = useSelector(selector.getPropertyLoadingStatus) === LoadingStatus.Succeeded;
  const isPropertyCrashed = useSelector(selector.getPropertyLoadingStatus) === LoadingStatus.Failed;
  const {id} = useParams<IdParam>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyDataAction(Number(id)));
    }
  },[dispatch, id]);

  const accommodation = useSelector(selector.getProperty);
  const reviews = useSelector(selector.getReviews);
  // const nearestAccommodations = useSelector(selector.getNearbyOffers)
  //   .slice()
  //   .splice(0, LIMITED_NUMBER_OF_NEAREST_ACCOMMODATIONS);


  if (isCheckedAuth(authorizationStatus) || !isPropertyLoaded || !accommodation) {
    return(
      <LoadingScreen />
    );
  }

  if (isPropertyCrashed) {
    return <Navigate to={AppRoutes.NotAvailable}/>;
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
                  {/* {
                    reviews.length > 0
                      ? reviews
                        .slice()
                        .sort((a, b) => Date.parse(String(b.reviewDate)) - Date.parse(String(a.reviewDate)))
                        .splice(0, LIMITED_NUMBER_OF_REVIEWS)
                        .map((line) => <PropertyReviewBox review={line} key={line.id}/>)
                      : <li className="reviews__item">No reviews have been published yet.</li>
                  } */}
                </ul>
                <PropertyCommentForm/>
              </section>
            </div>
          </div>
          {/* <Map positionClass={MapClassName.Property} propertyTownInfo={accommodation}/> */}
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {/* {nearestAccommodations
                .map((line) => <HotelCard accommodationInfo={line} cardKind={PlaceCard.Property} key={line.id}/>)} */}
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}

export default Property;
