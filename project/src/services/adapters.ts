import { RawOffer, RawReview, SingleOffer, SingleReview } from '../types/types';
import { RawUserData, UserData } from '../types/user-info-type';

export const adaptOfferToClient = (offer: RawOffer): SingleOffer => {

  const adaptedData = {
    ...offer,
    adultsNumber: Number(offer.maxAdults),
    accommodationType: String(offer.type),
    propertyPreview: String(offer.previewImage),
    propertyPhotos: offer.images ? offer.images : [],
    host: {
      ...offer.host,
      avatarImg: String(offer.host.avatarUrl),
    },
  };

  delete adaptedData.maxAdults;
  delete adaptedData.type;
  delete adaptedData.previewImage;
  delete adaptedData.images;
  delete adaptedData.host.avatarUrl;

  return adaptedData;
};

export const adaptReviewToClient = (review: RawReview): SingleReview => {
  const adaptedData = {
    ...review,
    reviewDate: review.date ?? new Date(),
    user: {
      ...review.user,
      avatarImg: String(review.user.avatarUrl),
    },
  };

  delete adaptedData.date;
  delete adaptedData.user.avatarUrl;

  return adaptedData;
};

export const adaptUserInfoToClient = (user: RawUserData): UserData => {
  const adaptedData = {
    ...user,
    avatar: String(user.avatarUrl),
  };

  delete adaptedData.avatarUrl;

  return adaptedData;
};
