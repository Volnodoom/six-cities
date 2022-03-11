export type HotelInfo = {
  id:number,
  city: {
    name: string,
    location: {
      latitude: number,
      longitude: number,
      zoom: number,
    },
  },
  bedrooms: number,
  adultsNumber: number,
  // max_adults have been changed to adultsNumber (need use adapter)
  price: number,
  rating: number,
  type: string,
  title: string,
  description: string,
  goods: string[],
  // is keys have been changed from is_X to isX (need use adapter)
  isFavorite: boolean,
  isPremium: boolean,
  // have been changed from preview_image to propertyPreview (need use adapter)
  propertyPreview: string,
  // have been changed from images to propertyPhotos (need use adapter)
  propertyPhotos: string[],
  location: {
    latitude: number,
    longitude: number,
    zoom: number,
  },
  host: {
    // avatar_url => avatarImg
    avatarImg: string,
    id: number,
    // is_pro => isPro
    isPro: boolean,
    name: string,
  },
};

export type SingleComment = {
  id: number,
  comment: string,
  date: Date,
  rating: number,
  user: {
    // avatar_url => avatarImg
    avatarImg: string,
    id: number,
    // is_pro => isPro
    isPro: boolean,
    name: string,
  },
};

