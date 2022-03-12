export const HUNDRED = 100;
export const STARS_NUMBER = 5;
export const LIMITED_NUMBER_OF_PHOTOS = 6;

export const AppRoutes = {
  Login: '/login',
  Root: '/',
  Favorites: '/favorites',
  Property: (id:number | string = ':id') => `/offer/${id}`,
  Plug: '#nowhere',
  NotAvailable: '*',
} as const;

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
] as const;

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


