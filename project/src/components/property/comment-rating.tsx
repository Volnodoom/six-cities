import { ChangeEvent, useEffect, useState } from 'react';

type CommentRatingProps = {
  number: number,
  stringNumber: string,
  isDisabled: boolean,
  highlightedStar: string,
  onRatingChange: (rating: string) => void,
};

function CommentRating (props: CommentRatingProps):JSX.Element {
  const {number, stringNumber, onRatingChange, isDisabled, highlightedStar} = props;
  const [stars, setStars] = useState('');

  useEffect(() => {
    if(!highlightedStar) {
      setStars('');
    }
  }, [highlightedStar]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onRatingChange(evt.target.value);
    setStars(evt.target.value);
  };

  return(
    <>
      <input
        onChange={handleChange}
        className="form__rating-input visually-hidden"
        name="rating"
        value={number}
        id={`${number}-stars`}
        type="radio"
        checked={number === Number(stars)}
        disabled={isDisabled}
      />

      <label
        htmlFor={`${number}-stars`}
        className="reviews__rating-label form__rating-label"
        title={stringNumber}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>

  );
}

export default CommentRating;
