export type SingleOffer = {
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
  price: number,
  rating: number,
  accommodationType: string,
  title: string,
  description: string,
  goods: string[],
  isFavorite: boolean,
  isPremium: boolean,
  propertyPreview: string,
  propertyPhotos: string[],
  location: {
    latitude: number,
    longitude: number,
    zoom: number,
  },
  host: {
    avatarImg: string,
    id: number,
    isPro: boolean,
    name: string,
  },
};

export type RawOffer = {
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
  maxAdults?: number,
  price: number,
  rating: number,
  type?: string,
  title: string,
  description: string,
  goods: string[],
  isFavorite: boolean,
  isPremium: boolean,
  previewImage?: string,
  images?: string[],
  location: {
    latitude: number,
    longitude: number,
    zoom: number,
  },
  host: {
    avatarUrl?: string,
    id: number,
    isPro: boolean,
    name: string,
  },
};

export type SingleReview = {
  id: number,
  comment: string,
  reviewDate: Date,
  rating: number,
  user: {
    avatarImg: string,
    id: number,
    isPro: boolean,
    name: string,
  },
};

export type RawReview = {
  id: number,
  comment: string,
  date?: Date,
  rating: number,
  user: {
    avatarUrl?: string,
    id: number,
    isPro: boolean,
    name: string,
  },
};

export type CityMainName = {name: string}
export type Location = {
    latitude: number,
    longitude: number,
    zoom: number,
}

export type CityMainDetails = CityMainName & Location


export type HighlightCardInfo = {
  isCardHighlighted: boolean;
  card: SingleOffer;
}

export type IdParam = {id: string};

export type Token = string;
