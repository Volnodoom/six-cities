import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { AppRoutes } from '../../const';
import Favorites from '../favoriets/favorites';
import Login from '../login/login';
import Main from '../main/main';
import Property from '../property/property';
import NotAvailablePage from '../routing/not-available-page';

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
          element={<Favorites/>}
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
