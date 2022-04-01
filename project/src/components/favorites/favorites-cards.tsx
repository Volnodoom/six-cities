// import { Cities, PlaceCard } from '../../const';
// import { SingleOffer } from '../../types/types';
// import HotelCard from '../general/hotel-card/hotel-card';
// import * as selector from '../../store/selector';
// import { useSelector } from 'react-redux';

function FavoritesCards (): void {
//   const accommodationsFavorite = useSelector(selector.getFavorites);

  //   const isCityFavorite = (town:Cities): [boolean, [] | SingleOffer[]] => {
  //     if (accommodationsFavorite.find((line) => line.city.name === town)) {
  //       const addresses = accommodationsFavorite.filter((line) => line.city.name === town);
  //       return [true, addresses];
  //     } else { return [false, []];}
  //   };

//   return(
//     <>
//       <h1 className="favorites__title">Saved listing</h1>
//       <ul className="favorites__list">
//         { Object.values(Cities).map((city) => isCityFavorite(city)[0] &&
//         <li className="favorites__locations-items">
//           <div className="favorites__locations locations locations--current">
//             <div className="locations__item">
//               <a className="locations__item-link" href="/">
//                 <span>{city}</span>
//               </a>
//             </div>
//           </div>
//           <div className="favorites__places">
//             {
//               isCityFavorite(city)[0] === true
//                 ? isCityFavorite(city)[1].map((line) =>  <HotelCard accommodationInfo={line} cardKind={PlaceCard.Favorites} key={line.id}/>)
//                 : ''
//             }
//           </div>
//         </li>)}
//       </ul>
//     </>
//   );
}

export default FavoritesCards;
