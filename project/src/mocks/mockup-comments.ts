import { SingleReview } from '../types/types';
import { names } from './mockup-hotel';

export const getRandomInteger = (a:number, b:number):number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function getRandomPositiveFloat (indA:number, indB:number, digits = 6) {
  const lower = Math.min(Math.abs(indA), Math.abs(indB));
  const upper = Math.max(Math.abs(indA), Math.abs(indB));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);}

const comments = [
  'The fence was confused about whether it was supposed to keep things in or keep things out.She tilted her head back and let whip cream stream into her mouth while taking a bath.',
  'More RVs were seen in the storage lot than at the campground. The white water rafting trip was suddenly halted by the unexpected brick wall. The sight of his goatee made me want to run and hide under my sister-in-law\'s bed.',
  'Wisdom is easily acquired when hiding under the bed with a saucepan on your head. I\'ve always wanted to go to Tajikistan, but my cat would miss me. Plans for this weekend include turning wine into water.',
  'Purple is the best city in the forest. Garlic ice-cream was her favorite.',
  'On Cloud Nine...Meaning: Having strong feelings of happiness or satisfaction...getRandomInteger.Back To the Drawing Board...Meaning: Starting over again on a new design from a previously failed attempt...Scot-free...Meaning: Getting away freely from custody, punishment, or any type of risky situation..Ring Any Bells?..Meaning: Recalling a memory; causing a person to remember something or someone.',
  'Top Drawer..Meaning: High quality, exceptional; something that\'s very valuable...Needle In a Haystack..Meaning: Something that is impossible or extremely difficult to find, especially because the area you have to search is too large...Down To Earth..Meaning: Practical or humble; unpretentious.',
  'Fool\'s Gold.. Meaning: Iron pyrities is a worthless mineral that resembles gold.. A Cold Day in July.. Meaning: Something that is highly unlikely to happen.',
  'Up In Arms. Meaning: Angry; being roused to the point that you are ready to fight.',
  'Raining Cats and Dogs.. Meaning: When it is raining heavily. Every Cloud Has a Silver Lining. Meaning: To be optimistic, even in difficullt times. High And Dry. Meaning: To be left behind; abandoned. Being in a helpless situation without a way to recover. Happy as a Clam. Meaning: The state of being happy; feeling delighted. Ride Him, Cowboy! Meaning: A cheer people yell, usually at rodeos when cowboys are clinging to the backs of untamed horses. Heads Up. Meaning: Used as an advanced warning. To become keenly aware.',
  'A Dime a Dozen Meaning: Something that is extremely common. Two Down, One to Go. Meaning: Two things have been completed, but there is one more that has yet to be finished. A Cat Nap. Meaning: A short slumber taken during the day.',
  'A Little from Column A, a Little from Column B. Meaning: A course of action drawing a couple of different factors or reasons.',
];

export const singleComment = (): SingleReview => ({
  id: Number(Date.now() + getRandomInteger(0,10000)),
  comment: comments[getRandomInteger(0,10)],
  reviewDate: new Date(getRandomInteger(2000, 2022), getRandomInteger(0, 11), getRandomInteger(1, 30), getRandomInteger(1, 24), getRandomInteger(0, 59)),
  rating: Number(getRandomPositiveFloat(1, 5, 1)),
  user: {
    avatarImg: `img/mockup/avatars/${getRandomInteger(1,16)}.jpg`,
    id: Number(Date.now() + getRandomInteger(0,10000)),
    isPro: [true, false][getRandomInteger(0, 1)],
    name: names[getRandomInteger(1, 20)],
  },
});
