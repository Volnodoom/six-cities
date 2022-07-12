import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingStatus, LogoPosition } from '../../const';
import { fetchFavoritesAction } from '../../store/data-favorites/data-favorites';
import * as selectorFavorites from '../../store/data-favorites/favorite-selector';
import { clearListOffers } from '../../store/data-offers/data-offers';
import * as selectorOffers from '../../store/data-offers/offers-selector';
import { setProperty } from '../../store/data-property/data-property';
import * as selectorUser from '../../store/data-user/user-selector';
import { isCheckedAuth } from '../../utils/utils-components';
import Header from '../general/header';
import Logo from '../general/logo';
import LoadingScreen from '../loading-screen/loading-screen';
import FavoritesCards from './favorites-cards';
import FavoritesEmpty from './favorites-empty';

function Favorites (): JSX.Element {
  const dispatch = useDispatch();
  const favoritesOffers = useSelector(selectorFavorites.getFavorites);
  const isFavoriteLoaded = useSelector(selectorFavorites.getFavoriteLoadingStatus) === LoadingStatus.Succeeded;
  const authorizationStatus = useSelector(selectorUser.getAuthorizationStatus);
  const listOffers = useSelector(selectorOffers.getOffers);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  },[dispatch]);

  if (isCheckedAuth(authorizationStatus) || !isFavoriteLoaded) {
    return(
      <LoadingScreen />
    );
  }

  const cleanDataForFavoriteLogics = () => {
    if(listOffers.length > 0) {
      dispatch(clearListOffers());
    }
    dispatch(setProperty(null));
  };

  cleanDataForFavoriteLogics();

  const isEmpty = favoritesOffers.length === 0;

  return(
    <div className="page">
      <Header/>
      <main className={`page__main page__main--favorites ${isEmpty && 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${isEmpty && 'favorites--empty'}`}>
            {isEmpty
              ? <FavoritesEmpty />
              :  <FavoritesCards />}
          </section>
        </div>
      </main>

      <footer className="footer container">
        <Logo position={LogoPosition.Footer} />
      </footer>

    </div>
  );
}

export default Favorites;
