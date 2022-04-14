import faker from 'faker';
import { ConstantForMocks } from '../const';
import { RawUserData, UserData } from '../types/user-info-type';

export const mockUser = (): UserData => ({
  id: faker.unique(faker.datatype.number),
  email: faker.internet.email(),
  token: faker.internet.password(ConstantForMocks.TokenLength),
  avatar: faker.internet.avatar(),
  name: faker.name.firstName(),
  isPro: faker.datatype.boolean(),
});

export const mockRawUser = (): RawUserData => ({
  id: faker.unique(faker.datatype.number),
  email: faker.internet.email(),
  token: faker.internet.password(ConstantForMocks.TokenLength),
  avatarUrl: faker.internet.avatar(),
  name: faker.name.firstName(),
  isPro: faker.datatype.boolean(),
});
