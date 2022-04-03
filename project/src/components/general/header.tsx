import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes, LogoPosition } from '../../const';
import { logoutAction } from '../../store/api-actions';
import * as selector from '../../store/data-user/user-selector';
import Logo from './logo';

type HeaderProps = {
  logo?: boolean;
  mainPage?: boolean;
}

function Header(props: HeaderProps): JSX.Element {
  const {logo, mainPage} = props;
  const isAuthorized = useSelector(selector.getIsAuthorized);
  const userData = useSelector(selector.getUserInfo);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClick = (evt: MouseEvent<HTMLAnchorElement>) =>{
    dispatch(logoutAction());
    if(location.pathname !== AppRoutes.Favorites) {
      evt.preventDefault();
    }
  };

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
                      <span className="header__user-name user__name">{userData?.email}</span>
                      :
                      <span className="header__login">Sign in</span>
                  }
                </Link>
              </li>
              {
                isAuthorized
                &&
                <li className="header__nav-item">
                  <Link to={AppRoutes.Root} className="header__nav-link" onClick={handleClick}>
                    <span className="header__signout">Sign out</span>
                  </Link>
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
