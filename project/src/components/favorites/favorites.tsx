import { LogoPosition } from '../../const';
import Header from '../general/header';
import Logo from '../general/logo';
import FavoritesCard from './favoriets-card';

function Favorites (): JSX.Element {
  return(
    <div className="page">
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoritesCard />
            </ul>
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
