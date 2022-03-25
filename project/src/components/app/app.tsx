import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { isCheckedAuth } from '../../utils/utils-components';
import Favorites from '../favorites/favorites';
import LoadingScreen from '../loading-screen/loading-screen';
import Login from '../login/login';
import Main from '../main/main';
import Property from '../property/property';
import NotAvailablePage from '../routing/not-available-page';
import PrivateRoute from '../routing/private-route';
import * as selector from '../../store/selector';

function App (): JSX.Element {
  const authorizationStatus = useSelector(selector.getAuthorizationStatus);
  const isDataLoaded = useSelector(selector.getIsDataLoadedStatus);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return(
      <LoadingScreen />
    );
  }

  return(
    <BrowserRouter>
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
          element={<Login/>}
        />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<NotAvailablePage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
