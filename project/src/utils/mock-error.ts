import faker from 'faker';
import { ConstantForMocks } from '../const';

export const mockError = () => faker.lorem.sentences(ConstantForMocks.ErrorLine);
