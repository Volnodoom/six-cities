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
            <a href="#nowhere" className={mainPage? 'header__logo-link header__logo-link--active' : 'header__logo-link'}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
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
