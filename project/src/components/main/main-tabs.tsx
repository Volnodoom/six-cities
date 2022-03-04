function MainTabs (): JSX.Element {
  return(
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          <li className="locations__item">
            <a href="/" className="locations__item-link tabs__item">
              <span>Paris</span>
            </a>
          </li>
          <li className="locations__item">
            <a href="/" className="locations__item-link tabs__item">
              <span>Cologne</span>
            </a>
          </li>
          <li className="locations__item">
            <a href="/" className="locations__item-link tabs__item">
              <span>Brussels</span>
            </a>
          </li>
          <li className="locations__item">
            <a href="/" className="locations__item-link tabs__item tabs__item--active">
              <span>Amsterdam</span>
            </a>
          </li>
          <li className="locations__item">
            <a href="/" className="locations__item-link tabs__item">
              <span>Hamburg</span>
            </a>
          </li>
          <li className="locations__item">
            <a href="/" className="locations__item-link tabs__item">
              <span>Dusseldorf</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default MainTabs;
