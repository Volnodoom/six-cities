import { useSelector } from 'react-redux';
import * as selectorUser from '../../store/data-user/user-selector';
import * as selectorProperty from '../../store/data-property/property-selector';
import * as selectorOffer from '../../store/data-offers/offers-selector';
import * as selectorFavorite from '../../store/data-favorites/favorite-selector';
import { divStyleErrorMsg } from './style-error-msg';

function ErrorMessage (): JSX.Element | null {
  const errorUser = useSelector(selectorUser.getUserError);
  const errorOffers = useSelector(selectorOffer.getOffersError);
  const errorProperty = useSelector(selectorProperty.getPropertyError);
  const errorFavorite = useSelector(selectorFavorite.getFavoriteError);

  if (errorUser) {
    return (
      <div style={divStyleErrorMsg}>{errorUser}</div>
    );
  } else if (errorOffers) {
    return (
      <div style={divStyleErrorMsg}>{errorOffers}</div>
    );
  } else if (errorProperty) {
    return (
      <div style={divStyleErrorMsg}>{errorProperty}</div>
    );
  } else if (errorFavorite) {
    return (
      <div style={divStyleErrorMsg}>{errorFavorite}</div>
    );
  }

  return null;
}

export default ErrorMessage;
