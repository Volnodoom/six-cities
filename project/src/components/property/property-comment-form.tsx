import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HOTEL_RATING, LoadingStatus } from '../../const';
import { fetchUserReviewAction } from '../../store/data-property/data-property';
import * as selector from '../../store/selector';
import { UserReviewType } from '../../types/types';
import CommentRating from './comment-rating';

const commentFormInitialState = {
  comment: '',
  rating: '0',
};

function PropertyCommentForm (): JSX.Element {
  const dispatch = useDispatch();
  const reviewLoadingStatus = useSelector(selector.getReviewStatus);
  const [reviewContent, setReviewContent] = useState(commentFormInitialState.comment);
  const [residenceRating, setResidenceRating] = useState(commentFormInitialState.rating);
  const [isElementDisabled, setIsElementDisabled] = useState(false);
  const [isElementReset, setIsElementReset] = useState(false);

  useEffect(() => {
    if (reviewLoadingStatus === LoadingStatus.Loading) {
      setIsElementDisabled(true);
    }
    if(reviewLoadingStatus === LoadingStatus.Succeeded) {
      resetForm();
    }
  }, [reviewLoadingStatus]);

  const resetForm = () => {
    setIsElementDisabled(false);
    setIsElementReset(true);
    setResidenceRating('');
    setReviewContent('');
  };

  const onSubmit = (userReview:UserReviewType) => {
    dispatch(fetchUserReviewAction(userReview));
  };

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement> ) => {
    evt.preventDefault();
    setReviewContent(evt.target.value);
    // eslint-disable-next-line no-console
    console.log(reviewContent, residenceRating);
  };

  const handleRatingChange = (rating:string) => setResidenceRating(rating);
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();


    onSubmit({
      comment: reviewContent,
      rating: Number(residenceRating),
    });
  };


  return(
    <form className="reviews__form form" onSubmit={handleSubmit} action="" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {HOTEL_RATING
          .slice()
          .reverse()
          .map(({value, stringValue}) =>
            (
              <CommentRating
                onRatingChange={handleRatingChange}
                number={value}
                stringNumber={stringValue}
                key={value}
                isDisabled={isElementDisabled}
                isReset={isElementReset}
              />
            ))}
      </div>

      <textarea
        onChange={handleTextChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewContent}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isElementDisabled}
        >
          {'Submit'}
        </button>
      </div>
    </form>
  );
}

export default PropertyCommentForm;
