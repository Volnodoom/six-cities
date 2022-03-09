import { LogoPosition } from '../../const';
import Logo from './logo';

type HeaderProps = {
  logo?: boolean;
  mainPage?: boolean;
}

function Header(props: HeaderProps): JSX.Element {
  const {logo, mainPage} = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {mainPage ? <Logo position={LogoPosition.MainComponent} /> : <Logo position={LogoPosition.Header} />}
          </div>
          {!logo &&
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a href="/" className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </a>
              </li>
              <li className="header__nav-item">
                <a href="/" className="header__nav-link">
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </ul>
          </nav>}
        </div>
      </div>
    </header>
  );
}

export default Header;
