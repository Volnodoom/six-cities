import MainTabs from './main-tabs';
import Header from '../general/header';
import MainEmpty from './main-empty';
import MainContent from './main-content';
import { useSelector } from 'react-redux';
import * as selector from '../../store/data-offers/offers-selector';

function Main (): JSX.Element {
  const cityAccommodations = useSelector(selector.getOffersForCity);

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
