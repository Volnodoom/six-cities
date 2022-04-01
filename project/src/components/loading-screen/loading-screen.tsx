function LoadingScreen (): JSX.Element {
  return(
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Loading ...</h1>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </footer>
    </>
  );
}

export default LoadingScreen;
