import { useDispatch } from 'react-redux';
import { postFavoriteAction } from '../../store/data-favorites/data-favorites';

type FavoriteButtonProps = {
  toggle: boolean,
  isPropertyPage?: boolean,
  id: number,
}

function FavoriteButton (props: FavoriteButtonProps): JSX.Element {
  const {toggle, isPropertyPage, id} = props;

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(postFavoriteAction(id));
  };

  return(
    <button
      className={
        isPropertyPage
          ?
          `${toggle ? 'property__bookmark-button--active button' : ''} property__bookmark-button button`
          :
          `${toggle ? 'place-card__bookmark-button--active button' : ''} place-card__bookmark-button button`
      }
      type="button"
      onClick={handleClick}
    >
      <svg
        className={isPropertyPage ? 'property__bookmark-icon' : 'place-card__bookmark-icon'}
        width={isPropertyPage ? '31' : '18'}
        height={isPropertyPage ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
