import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import * as selector from '../../store/data-user/user-selector';

type PrivateRouteProps = RouteProps & {
  children: JSX.Element;
  privatePath: string;
}

function PrivateRoute (props: PrivateRouteProps): JSX.Element {
  const {children, privatePath} = props;
  const authorizationStatus = useSelector(selector.getAuthorizationStatus);
  switch(privatePath) {
    case AppRoutes.Login:
      return(
        authorizationStatus === AuthorizationStatus.Auth
          ? <Navigate to={AppRoutes.Root} />
          : children
      );
    case AppRoutes.Favorites:
      return(
        authorizationStatus === AuthorizationStatus.Auth
          ? children
          : <Navigate to={AppRoutes.Login} replace/>
      );
    default: return children;
  }
}

export default PrivateRoute;
