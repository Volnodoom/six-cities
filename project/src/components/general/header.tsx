import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus, LogoPosition } from '../../const';
import * as selector from '../../store/selector';
import Logo from './logo';

type HeaderProps = {
  logo?: boolean;
  mainPage?: boolean;
}

function Header(props: HeaderProps): JSX.Element {
  const {logo, mainPage} = props;
  const authorizationStatus = useSelector(selector.getAuthorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const userData = useSelector(selector.getUserInfo);

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
                <Link to={isAuthorized ? AppRoutes.Root : AppRoutes.Login} className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {
                    isAuthorized
                      ?
                      <span className="header__user-name user__name">{userData && userData.email}</span>
                      :
                      <span className="header__login">Sign in</span>
                  }
                </Link>
              </li>
              {
                isAuthorized
                &&
                <li className="header__nav-item">
                  <a href="/" className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              }
            </ul>
          </nav>}
        </div>
      </div>
    </header>
  );
}

export default Header;
