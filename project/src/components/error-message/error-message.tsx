import { useSelector } from 'react-redux';
import * as selector from '../../store/selector';
import { divStyleErrorMsg } from './style-error-msg';

function ErrorMessage (): JSX.Element | null {
  const error = useSelector(selector.getError);

  if(error) {
    return (
      <div style={divStyleErrorMsg}>{error}</div>
    );
  }

  return null;
}

export default ErrorMessage;
