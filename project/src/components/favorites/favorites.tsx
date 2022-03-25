import { useDispatch, useSelector } from 'react-redux';
import { LogoPosition } from '../../const';
import { fetchFavoritesAction } from '../../store/api-actions';
import * as selector from '../../store/selector';
import Header from '../general/header';
import Logo from '../general/logo';
import FavoritesCards from './favorites-cards';
import FavoritesEmpty from './favorites-empty';

function Favorites (): JSX.Element {
  const dispatch = useDispatch();
  dispatch(fetchFavoritesAction());
  const favoritesOffers = useSelector(selector.getFavorites);
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
