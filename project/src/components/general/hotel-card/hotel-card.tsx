// import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes, PlaceCard } from '../../../const';
import { HighlightCardInfo, SingleOffer } from '../../../types/types';
import CardContent from './card-content';

type HotelCardProps = {
  accommodationInfo: SingleOffer,
  onMouseIn?: (offerCard: HighlightCardInfo | null) => void,
  cardKind: PlaceCard,
}

function HotelCard (props: HotelCardProps): JSX.Element {
  const {cardKind, accommodationInfo, onMouseIn}=props;
  const {
    id,
    isPremium,
    propertyPreview,
  }=props.accommodationInfo;

  let articleClassName = '';
  let divImgLinkClassName = '';
  let imgParameters: number[] = [];

  switch (cardKind) {
    case PlaceCard.Main:
      articleClassName = 'cities__place-card';
      divImgLinkClassName = 'cities__image-wrapper';
      imgParameters = [260, 200];
      break;
    case PlaceCard.Property:
      articleClassName = 'near-places__card';
      divImgLinkClassName = 'near-places__image-wrapper';
      imgParameters = [260, 200];
      break;
    case PlaceCard.Favorites:
      articleClassName = 'favorites__card';
      divImgLinkClassName = 'favorites__image-wrapper';
      imgParameters = [150, 110];
      break;
  }

  const handleEnter = () => {if(onMouseIn) {
    onMouseIn({isCardHighlighted: true, card: accommodationInfo});}
  };

  const handleLeave = () => {if(onMouseIn) {
    onMouseIn({isCardHighlighted: false, card: accommodationInfo});}
  };

  return(
    <article
      className={`${articleClassName} place-card`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {(cardKind === PlaceCard.Main) && isPremium
        ? <div className="place-card__mark"><span>Premium</span></div>
        : ''}

      <div className={`${divImgLinkClassName} place-card__image-wrapper`}>
        <Link to={AppRoutes.Property(id)} >
          <img
            className="place-card__image"
            src={propertyPreview}
            width={imgParameters[0]}
            height={imgParameters[1]}
            alt="Place"
          />
        </Link>
      </div>

      {cardKind === PlaceCard.Favorites
        ? <CardContent isFavoritePage accommodationInfo={accommodationInfo}/>
        : <CardContent accommodationInfo={accommodationInfo}/>}

    </article>
  );
}

export default HotelCard;
