import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { nonAvailableDiv, nonAvailableLink, nonAvailableText } from './style-for-not-available-page';

function NotAvailablePage ():JSX.Element {
  return (
    <div style={nonAvailableDiv}>
      <h1 style={nonAvailableText}>
      404.
        <small> Page not found</small>
      </h1>
      <Link to={AppRoutes.Root} style={nonAvailableLink}>
        Go to main page
      </Link>
    </div>
  );
}

export default NotAvailablePage;
