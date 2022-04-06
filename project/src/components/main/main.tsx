import MainTabs from './main-tabs';
import Header from '../general/header';
import MainEmpty from './main-empty';
import MainContent from './main-content';
import { useDispatch, useSelector } from 'react-redux';
import * as selector from '../../store/data-offers/offers-selector';
import { useEffect } from 'react';
import { fetchOffersAction } from '../../store/data-offers/data-offers';
import { LoadingStatus } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';

function Main (): JSX.Element {
  const cityAccommodations = useSelector(selector.getOffersForCity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const isOfferLoaded = useSelector(selector.getOffersLoadingStatus) === LoadingStatus.Succeeded;

  if (!isOfferLoaded) {
    return(
      <LoadingScreen />
    );
  }


  return(
    <div className="page page--gray page--main">
      <Header mainPage/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <MainTabs />
        <div className="cities">
          {
            cityAccommodations.length === 0
              ? <MainEmpty />
              : <MainContent />
          }
        </div>
      </main>
    </div>
  );
}

export default Main;
