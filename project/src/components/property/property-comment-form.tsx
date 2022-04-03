import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessageSubmittingReview, HOTEL_RATING, LoadingStatus, MAX_REVIEW_SIZE, MIN_REVIEW_SIZE } from '../../const';
import { fetchUserReviewAction, reviewStatus } from '../../store/data-property/data-property';
import * as selector from '../../store/data-property/property-selector';
import { UserReviewType } from '../../types/types';
import CommentRating from './comment-rating';

const commentFormInitialState = {
  comment: '',
  rating: '',
};

function PropertyCommentForm (): JSX.Element {
  const dispatch = useDispatch();
  const reviewLoadingStatus = useSelector(selector.getReviewStatus);
  const [reviewContent, setReviewContent] = useState(commentFormInitialState.comment);
  const [isReviewContentValid, setIsReviewContentValid] = useState(false);
  const [residenceRating, setResidenceRating] = useState(commentFormInitialState.rating);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const resetForm = () => {
      setIsBtnDisabled(true);
      setResidenceRating('');
      setReviewContent('');
      setIsLoading(false);
      setIsReviewContentValid(false);
      dispatch(reviewStatus(LoadingStatus.Idle));
    };

    (reviewLoadingStatus === LoadingStatus.Loading) && blockForm();
    (reviewLoadingStatus === LoadingStatus.Succeeded) && resetForm();
    (reviewLoadingStatus === LoadingStatus.Failed) && unblockForm();

    isReviewContentValid && residenceRating && setIsBtnDisabled(false);
    !residenceRating && setIsBtnDisabled(true);
    !isReviewContentValid && setIsBtnDisabled(true);
  }, [dispatch, isReviewContentValid, residenceRating, reviewLoadingStatus]);


  const blockForm = () => {
    setIsBtnDisabled(true);
    setIsLoading(true);
  };

  const unblockForm = () => {
    setIsLoading(false);
    setIsBtnDisabled(false);
  };

  const onSubmit = (userReview:UserReviewType) =>
    dispatch(fetchUserReviewAction(userReview));

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement> ) => {
    evt.preventDefault();
    const reviewElement = evt.target;
    const reviewValue = evt.target.value;

    if(reviewValue.trim().length < MIN_REVIEW_SIZE) {
      reviewElement.setCustomValidity(ErrorMessageSubmittingReview.TextMin);
    } else if (reviewValue.length > MAX_REVIEW_SIZE) {
      reviewElement.setCustomValidity(ErrorMessageSubmittingReview.TextMax);
    } else {
      reviewElement.setCustomValidity('');
    }

    setReviewContent(reviewValue);
    setIsReviewContentValid(reviewElement.reportValidity());
  };

  const handleRatingChange = (rating:string) => {
    setResidenceRating(rating);
  };
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
                isDisabled={isLoading}
                highlightedStar={residenceRating}
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
        disabled={isLoading}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isBtnDisabled}
        >
          {isLoading ? 'Saving...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default PropertyCommentForm;
