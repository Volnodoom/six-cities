export const TEN = 10;
export const HUNDRED = 100;
export const STAR_STEP = 20;
export const STARS_NUMBER = 5;
export const LIMITED_NUMBER_OF_PHOTOS = 6;
export const LIMITED_NUMBER_OF_REVIEWS = 10;
export const LIMITED_NUMBER_OF_NEAREST_ACCOMMODATIONS = 3;
export const DATE_TIME_FORMAT_USA_STYLE = 'en-US';
export const PIN_ON_MAP_SIZE = [28, 40];
export const PIN_ON_MAP_ANCHOR = [14, 40];
export const BACKEND_URL = 'https://9.react.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;
export const TIMEOUT_SHOW_ERROR = 3000;
export const AUTH_TOKEN_KEY_NAME = 'guess-six-sites-token';
export const REDIRECT_GLOBAL = 'global/redirectToRoute';
export const CLEAR_ERROR = 'data/clearError';
export const MIN_REVIEW_SIZE = 50;
export const MAX_REVIEW_SIZE = 300;
export const NO_CONNECTION = 'Network Error';
export const NO_CONNECTION_MESSAGE = 'There is some internet connection problems on your side, please, try it again.';

export enum SortingLabel {
  Popular = 'Popular',
  Low = 'Price: low to high',
  High = 'Price: high to low',
  TopRate = 'Top rated first',
}

export const APIRoutes = {
  Favorites: '/favorite',
  FavoriteOne: (id: number, favoriteStatus: FavoriteCondition) => `/favorite/${id}/${favoriteStatus}`,
  Login: '/login',
  Logout: '/logout',
  Offers: '/hotels',
  Reviews: (id: number) => `/comments/${id}`,
  Property: (id: number) => `/hotels/${id}`,
  nearbyOffers: (id: number) => `/hotels/${id}/nearby`,
} as const;

export const AppRoutes = {
  Login: '/login',
  Root: '/',
  Favorites: '/favorites',
  Property: (id: number | string = ':id') => `/offer/${id}`,
  Empty: '',
  NotAvailable: '*',
} as const;

export const PinOnMap = {
  SizeWidth: 28,
  SizeHeight: 40,
  AnchorWidth: 28,
  AnchorHeight: 40,
};

export const HOTEL_RATING = [
  {
    value: 1,
    stringValue: 'Terribly',
  },
  {
    value: 2,
    stringValue: 'Badly',
  },
  {
    value: 3,
    stringValue: 'Not bad',
  },
  {
    value: 4,
    stringValue: 'Good',
  },
  {
    value: 5,
    stringValue: 'Perfect',
  },
];

export enum PlaceCard {
  Main = 'MAIN',
  Property = 'PROPERTY',
  Favorites = 'FAVORITES',
}

export enum LogoPosition {
  Header = 'HEADER',
  Footer = 'FOOTER',
  MainComponent = 'MAIN_COMPONENT',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_Auth',
  Unknown = 'UNKNOWN',
}

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum PinMarker {
  Default = 'img/pin.svg',
  Selected = 'img/pin-active.svg',
}

export enum MapClassName {
  Main = 'cities__map',
  Property = 'property__map',
}

export enum ServerResponse {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export const ErrorMessageContentPassword = [
  'Current password does not contain any numbers. Please, add any number to make it safer.',
  'Current password does not contain any letters. Please, add any Latin letter to make it safer.',
  'Your password should not contain any spaces. Please, remove it',
];

export const ErrorMessageSubmittingReview = {
  TextMin: 'Your review should contain at least 50 symbols. Please, provide a more detailed feedback.',
  TextMax: 'Your review should not contain more then 300 symbols. Please, provide your feedback in more concise way.',
  Rating: 'It is required to set rating (number of stars).',
};

export enum NameSpace {
  DataOffers = 'DATA_OFFERS',
  DataProperty = 'DATA_PROPERTY',
  DataUser = 'DATA_USER',
  DataFavorites = 'DATA_FAVORITES',
}

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export enum ApiActions {
  FetchOffers = 'data/fetchOffers',
  FetchPropertyData = 'data/fetchPropertyData',
  FetchUserData = 'data/fetchUserData',
  CheckAuthorization = 'user/checkAuth',
  PostLogin = 'user/login',
  Logout = 'user/logout',
  FetchReview = 'data/fetchUserReview',
  FetchFavorites = 'data/fetchFavorites',
  PostFavorite = 'data/postFavorite',
}

export const ReviewDateTimeFormat = {
  month: 'long',
  year: 'numeric',
} as const;

export enum FavoriteCondition {
  Add = 1,
  Remove = 0,
}

export const ConstantForMocks = {
  CoordinatesMin: 50,
  CoordinatesMax: 55,
  CoordinatesPrecision: 0.00001,
  CoordinatesZoomMin: 5,
  CoordinatesZoomMax: 10,
  PeopleNumber: 10,
  PriceMin: 10,
  PriceMax: 550,
  RatingMin: 1,
  RatingMax: 5,
  RatingPrecision: 0.1,
  TitleWordsNumber: 3,
  SentenceLength: 20,
  ArraySize: 8,
  TokenLength: 25,
  ErrorLine: 1,
  UnknownAction: {type: 'UNKNOWN_ACTION'},
  RequestFulfilled: 200,
  RequestUnauthorized: 401,
  RequestBadRequest: 400,
  LogoutFulfilled: 204,
};
