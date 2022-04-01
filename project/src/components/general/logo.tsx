import { MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes, LogoPosition } from '../../const';

function Logo (props: {position: LogoPosition}):JSX.Element {
  const {position} = props;

  let logoParameters: number[] = [];
  let logoClass: string[] = [''];

  switch (position) {
    case LogoPosition.Header:
      logoClass = ['header__logo-link', 'header__logo'];
      logoParameters = [81, 41];
      break;
    case LogoPosition.MainComponent:
      logoClass = ['header__logo-link header__logo-link--active', 'header__logo'];
      logoParameters = [81, 41];
      break;
    case LogoPosition.Footer:
      logoClass = ['footer__logo-link', 'footer__logo'];
      logoParameters = [64, 33];
      break;
  }

  const location = useLocation();
  const handleLinkDisable = (evt: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === AppRoutes.Root || location.pathname === AppRoutes.Empty) {
      evt.preventDefault();
    }
  };


  return(
    <Link className={logoClass[0]} to={AppRoutes.Root} onClick={handleLinkDisable}>
      <img className={logoClass[1]} src="img/logo.svg" alt="6 cities logo" width={logoParameters[0]} height={logoParameters[1]}/>
    </Link>
  );
}

export default Logo;


