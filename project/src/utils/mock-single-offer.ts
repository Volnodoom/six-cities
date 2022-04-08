import faker from 'faker';
import { ConstantForMocks } from '../const';
import { SingleOffer } from '../types/types';

export const  makeFakeSingleOffer = (): SingleOffer => ({
  id: faker.unique(faker.datatype.number),
  city: {
    name: faker.address.city(),
    location: {
      latitude: faker.datatype.number({
        min: ConstantForMocks.CoordinatesMin,
        max: ConstantForMocks.CoordinatesMax,
        precision: ConstantForMocks.CoordinatesPrecision}),
      longitude: faker.datatype.number({
        min: ConstantForMocks.CoordinatesMin,
        max: ConstantForMocks.CoordinatesMax,
        precision: ConstantForMocks.CoordinatesPrecision}),
      zoom: faker.datatype.number({
        min: ConstantForMocks.CoordinatesZoomMin,
        max: ConstantForMocks.CoordinatesZoomMax}),
    },
  },
  bedrooms: faker.datatype.number(ConstantForMocks.PeopleNumber),
  adultsNumber: faker.datatype.number(ConstantForMocks.PeopleNumber),
  price: faker.datatype.number({
    min: ConstantForMocks.PriceMin,
    max: ConstantForMocks.PriceMax }),
  rating: faker.datatype.number({
    min: ConstantForMocks.RatingMin,
    max: ConstantForMocks.RatingMax,
    precision: ConstantForMocks.RatingPrecision }),
  accommodationType: faker.lorem.word(),
  title: faker.lorem.words(ConstantForMocks.TitleWordsNumber),
  description: faker.lorem.sentence(ConstantForMocks.SentenceLength),
  goods: Array.from({length: ConstantForMocks.ArraySize}, () => faker.lorem.word()),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  propertyPreview: faker.lorem.sentence(ConstantForMocks.SentenceLength),
  propertyPhotos: Array.from({length: ConstantForMocks.ArraySize}, () => faker.internet.avatar()),
  location: {
    latitude: faker.datatype.number({
      min: ConstantForMocks.CoordinatesMin,
      max: ConstantForMocks.CoordinatesMax,
      precision: ConstantForMocks.CoordinatesPrecision}),
    longitude: faker.datatype.number({
      min: ConstantForMocks.CoordinatesMin,
      max: ConstantForMocks.CoordinatesMax,
      precision: ConstantForMocks.CoordinatesPrecision}),
    zoom: faker.datatype.number({
      min: ConstantForMocks.CoordinatesZoomMin,
      max: ConstantForMocks.CoordinatesZoomMax}),
  },
  host: {
    avatarImg: faker.internet.avatar(),
    id: faker.datatype.number(),
    isPro: faker.datatype.boolean(),
    name: faker.name.firstName(),
  },
});
