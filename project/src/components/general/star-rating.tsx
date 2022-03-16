import { getStarRating } from '../../utils/utils-components';

function StarRating (props: {rating: number}):JSX.Element {
  const {rating} = props;
  return(
    <span style={{width: `${getStarRating(rating)}%`}}></span>
  );
}

export default StarRating;
