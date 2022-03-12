import { HUNDRED, STARS_NUMBER } from '../const';

export const getStarRating = (rating: number): number => {
  const percentage = Math.round(rating*HUNDRED/STARS_NUMBER);

  if (percentage > HUNDRED) {
    return HUNDRED;
  } else {return percentage;}
};

