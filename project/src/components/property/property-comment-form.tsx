import { HOTEL_RATING } from '../const/const';
import CommentRating from './comment-rating';

function PropertyCommentForm (): JSX.Element {
  return(
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {HOTEL_RATING.slice().reverse().map(({value, stringValue})=> <CommentRating number={value} stringNumber={stringValue} key={value}/>)}
      </div>

      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default PropertyCommentForm;
