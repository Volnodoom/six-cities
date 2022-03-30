import { useSelector } from 'react-redux';
import * as selector from '../../store/selector';
import { divStyleErrorMsg } from './style-error-msg';

function ErrorMessage (): JSX.Element | null {
  const errorUser = useSelector(selector.getUserError);
  const errorOffers = useSelector(selector.getOffersError);
  const errorProperty = useSelector(selector.getPropertyError);

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
  }

  return null;
}

export default ErrorMessage;
