import { LogoPosition } from '../../const';
import { SingleOffer } from '../../types/types';
import Header from '../general/header';
import Logo from '../general/logo';
import FavoritesCards from './favorites-cards';

function Favorites (props: {accommodations: SingleOffer[]} ): JSX.Element {
  const {accommodations} = props;
  const favoritesOffers = accommodations.filter((line) => line.isFavorite === true);

  return(
    <div className="page">
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesCards accommodationsFavorite={favoritesOffers}/>
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
