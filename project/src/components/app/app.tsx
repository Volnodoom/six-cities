import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import Favorites from '../favoriets/favorites';
import Login from '../login/login';
import Main from '../main/main';
import Property from '../property/property';
import NotAvailablePage from '../routing/not-available-page';
import PrivateRoute from '../routing/private-route';

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoutes.Root}
          element={<Main/>}
        />
        <Route
          path={AppRoutes.Property(1)}
          element={<Property/>}
        />
        <Route
          path={AppRoutes.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites/>
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
