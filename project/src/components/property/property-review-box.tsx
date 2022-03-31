import { DATE_TIME_FORMAT_USA_STYLE, ReviewDateTimeFormat } from '../../const';
import { SingleReview } from '../../types/types';
import StarRating from '../general/star-rating';

function PropertyReviewBox (props: {review: SingleReview}): JSX.Element {
  const {
    rating,
    comment,
    reviewDate,
  } = props.review;
  const {avatarImg} = props.review.user;
  const userName = props.review.user.name;

  const formattedDateToClient = new Date(reviewDate).toLocaleDateString(DATE_TIME_FORMAT_USA_STYLE, ReviewDateTimeFormat);

  return (
    <li className="reviews__item">

      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarImg} width="54" height="54" alt="Reviews avatar."/>
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>

      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <StarRating rating={rating} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={`${reviewDate}`}>
          {formattedDateToClient}
        </time>
      </div>

    </li>
  );
}

export default PropertyReviewBox;
