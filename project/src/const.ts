export const AppRoutes = {
  Login: '/login',
  Root: '/',
  Favorites: '/favorites',
  Property: (id:number) => `/offer/:${id}`,
  Plug: '#nowhere',
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
