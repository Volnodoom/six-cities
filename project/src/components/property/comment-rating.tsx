type CommentRatingProps = {
  number: number,
  stringNumber: string,
};

function CommentRating (props: CommentRatingProps):JSX.Element {
  const {number, stringNumber} = props;
  return(
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={number} id={`${number}-stars`} type="radio" />
      <label htmlFor={`${number}-stars`} className="reviews__rating-label form__rating-label" title={stringNumber}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>

  );
}

export default CommentRating;
