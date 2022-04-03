import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AppRoutes, LoadingStatus } from '../../const';
import { isCheckedAuth } from '../../utils/utils-components';
// import Favorites from '../favorites/favorites';
import LoadingScreen from '../loading-screen/loading-screen';
import Login from '../login/login';
import Main from '../main/main';
import Property from '../property/property';
import NotAvailablePage from '../routing/not-available-page';
import PrivateRoute from '../routing/private-route';
import * as selector from '../../store/data-user/user-selector';
import * as selectorOffers from '../../store/data-offers/offers-selector';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App (): JSX.Element {
  const authorizationStatus = useSelector(selector.getAuthorizationStatus);
  const isOfferLoaded = useSelector(selectorOffers.getOffersLoadingStatus) === LoadingStatus.Succeeded;

  if (isCheckedAuth(authorizationStatus) || !isOfferLoaded) {
    return(
      <LoadingScreen />
    );
  }

  return(
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoutes.Root}
          element={<Main />}
        />
        <Route
          path={AppRoutes.Property()}
          element={<Property />}
        />
        <Route
          path={AppRoutes.Login}
          element={
            <PrivateRoute privatePath={AppRoutes.Login}>
              <Login/>
            </PrivateRoute>
          }
        />
        {/* <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute privatePath={AppRoutes.Favorites}>
              <Favorites />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="*"
          element={<NotAvailablePage/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
