import { SingleOffer } from '../types/types';

const getRandomInteger = (a:number, b:number):number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function getRandomPositiveFloat (indA:number, indB:number, digits = 6) {
  const lower = Math.min(Math.abs(indA), Math.abs(indB));
  const upper = Math.max(Math.abs(indA), Math.abs(indB));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);}


const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

const descriptions = [
  'Not all people who wander are lost.',
  'Being unacquainted with the chief raccoon was harming his prospects for promotion.',
  'She cried diamonds.',
  'He dreamed of leaving his law firm to open a portable dog wash.',
  'Too many prisons have become early coffins.',
  'I\'d always thought lightning was something only I could see.',
  'I\'m not a party animal, but I do like animal parties.',
  'Homesickness became contagious in the young campers\' cabin.',
  'Poison ivy grew through the fence they said was impenetrable.',
  'He dreamed of eating green apples with worms.',
];

const goodsBase = [
  'Heating',
  'Kitchen',
  'Cable TV',
  'Washing machine',
  'Coffee machine',
  'Dishwasher',
  'Jewelry',
  'Glass and ceramics',
  'Pewter items',
  'Rope',
  'Leather goods',
  'Furniture',
  'Pewter items',
  'Chests and crates',
  'Common clothes',
  'Bird',
  'Toy',
];

const apartmentType = [
  'apartment',
  'room',
  'house',
  'hotel',
];

const titles = [
  'Don\'t Count Your Chickens Before They Hatch',
  'Quick and Dirty',
  'Know the Ropes',
  'Cry Over Spilt Milk',
  'Under Your Nose',
  'A Busy Body',
  'Poke Fun At',
  'Go Out On a Limb',
  'Jaws of Death',
  'A Hundred and Ten Percent',
  'Not the Sharpest Tool in the Shed',
];

export const names = [
  'Sharron Leon',
  'Janis York',
  'Ursula Osborne',
  'Ernie Stevens',
  'Araceli Burch',
  'Cheri Stewart',
  'Elnora Pugh',
  'Alberto Suarez',
  'Lindy Fletcher',
  'Jarred Russell',
  'Terra Wheeler',
  'Hans Flowers',
  'Twila Hickman',
  'Houston Brennan',
  'Jerrold Waters',
  'Hassan Martin',
  'Frank Saunders',
  'Carmela Frederick',
  'Greta Henry',
  'Dale Jackson',
];

export const hotelInfo = (): SingleOffer => ({
  id: Number(Date.now() + getRandomInteger(0,10000)),
  city: {
    name: cities[getRandomInteger(0,5)],
    location: {
      latitude: Number(getRandomPositiveFloat(45, 55)),
      longitude: Number(getRandomPositiveFloat(2, 15)),
      zoom: 10,
    },
  },
  bedrooms: getRandomInteger(1,10),
  adultsNumber: getRandomInteger(1,10),
  price: getRandomInteger(50,500),
  rating: Number(getRandomPositiveFloat(1, 5, 1)),
  accommodationType: apartmentType[getRandomInteger(0,3)],
  title: titles[getRandomInteger(0,10)],
  description: descriptions[getRandomInteger(0,9)],
  goods: goodsBase.slice(getRandomInteger(0, 10), getRandomInteger(11,16)),
  isFavorite: [true, false][getRandomInteger(0, 1)],
  isPremium: [true, false][getRandomInteger(0, 1)],
  propertyPreview: `img/mockup/buildings/${getRandomInteger(1,16)}.jpg`,
  propertyPhotos: new Array(getRandomInteger(2, 6)).fill(' ').map((line) => line = `img/mockup/rooms/${getRandomInteger(1,17)}.jpg`),
  location: {
    latitude: Number(getRandomPositiveFloat(45, 55)),
    longitude: Number(getRandomPositiveFloat(2, 15)),
    zoom: 8,
  },
  host: {
    avatarImg: `img/mockup/avatars/${getRandomInteger(1,16)}.jpg`,
    id: Number(Date.now() + getRandomInteger(0,10000)),
    isPro: [true, false][getRandomInteger(0, 1)],
    name: names[getRandomInteger(1, 10)],
  },
});

const amsterdamCoordinates = [
  {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 8,
  },
  {
    latitude: 52.369553943508,
    longitude: 4.85309666406198,
    zoom: 8,
  },
  {
    latitude: 52.3909553943508,
    longitude: 4.929309666406198,
    zoom: 8,
  },
  {
    latitude: 52.3809553943508,
    longitude: 4.939309666406198,
    zoom: 8,
  },
];

export const AmsterdamMapData = (): SingleOffer => ({
  id: Number(Date.now() + getRandomInteger(0,10000)),
  city: {
    name: cities[3],
    location: {
      latitude: 52.377956,
      longitude: 4.897070,
      zoom: 10,
    },
  },
  bedrooms: getRandomInteger(1,10),
  adultsNumber: getRandomInteger(1,10),
  price: getRandomInteger(50,500),
  rating: Number(getRandomPositiveFloat(1, 5, 1)),
  accommodationType: apartmentType[getRandomInteger(0,3)],
  title: titles[getRandomInteger(0,10)],
  description: descriptions[getRandomInteger(0,9)],
  goods: goodsBase.slice(getRandomInteger(0, 10), getRandomInteger(11,16)),
  isFavorite: [true, false][getRandomInteger(0, 1)],
  isPremium: [true, false][getRandomInteger(0, 1)],
  propertyPreview: `img/mockup/buildings/${getRandomInteger(1,16)}.jpg`,
  propertyPhotos: new Array(getRandomInteger(2, 6)).fill(' ').map((line) => line = `img/mockup/rooms/${getRandomInteger(1,17)}.jpg`),
  location: amsterdamCoordinates[Number(getRandomInteger(0, 3))],
  host: {
    avatarImg: `img/mockup/avatars/${getRandomInteger(1,16)}.jpg`,
    id: Number(Date.now() + getRandomInteger(0,10000)),
    isPro: [true, false][getRandomInteger(0, 1)],
    name: names[getRandomInteger(1, 10)],
  },
});
