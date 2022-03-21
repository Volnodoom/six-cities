import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { getRandomInteger, singleComment } from '../../mocks/mockup-comments';
import { hotelInfo } from '../../mocks/mockup-hotel';
import { listOffers } from '../../store/action';
import { SingleOffer, SingleReview } from '../../types/types';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Main from '../main/main';
import Property from '../property/property';
import NotAvailablePage from '../routing/not-available-page';
import PrivateRoute from '../routing/private-route';

const hotelData: SingleOffer[] = new Array(30).fill('').map(() => hotelInfo());
const reviewData: SingleReview[] = new Array(getRandomInteger(1,13)).fill('').map(() => singleComment());

function App (): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(listOffers(hotelData));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoutes.Root}
          element={<Main />}
        />
        <Route
          path={AppRoutes.Property()}
          element={<Property accommodations={hotelData} reviews={reviewData}/>}
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
