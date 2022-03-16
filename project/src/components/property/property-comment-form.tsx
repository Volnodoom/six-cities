import { ChangeEvent, useState } from 'react';
import { HOTEL_RATING } from '../../const';
import CommentRating from './comment-rating';

const commentFormInitialState = {
  Comment: '',
  Rating: '0',
};

function PropertyCommentForm (): JSX.Element {
  const [comment, setComment] = useState(commentFormInitialState.Comment);
  const [residenceRating, setResidenceRating] = useState(commentFormInitialState.Rating);

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement> ) => {
    evt.preventDefault();
    setComment(evt.target.value);
    // eslint-disable-next-line no-console
    console.log(comment, residenceRating);
  };


  return(
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {HOTEL_RATING
          .slice()
          .reverse()
          .map(({value, stringValue}) =>
            <CommentRating onRatingChange={(rating:string) => setResidenceRating(rating)} number={value} stringNumber={stringValue} key={value}/>)}
      </div>

      <textarea
        onChange={handleTextChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />

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
