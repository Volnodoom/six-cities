import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import { hotelInfo } from '../../mocks/mockup-hotel';
import { SingleOffer } from '../../types/types';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Main from '../main/main';
import Property from '../property/property';
import NotAvailablePage from '../routing/not-available-page';
import PrivateRoute from '../routing/private-route';

const hotelData: SingleOffer[] = new Array(30).fill('').map((line) => hotelInfo());

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoutes.Root}
          element={<Main accommodations={hotelData}/>}
        />
        <Route
          path={AppRoutes.Property()}
          element={<Property accommodations={hotelData}/>}
        />
        <Route
          path={AppRoutes.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites accommodations={hotelData}/>
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
