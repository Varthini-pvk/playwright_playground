// fixtures for dynamic test data generation

import {test as base} from './test.fixture.js';
import { UserFactory } from '../../test_data/api/Factories/userDataFactory.js';
import { User } from "../../models/users.js";

type dataFixtures = {
createUser:(overrides?: Partial<User>) => User;

}

export const test = base.extend<dataFixtures>({
   createUser: async({},use) =>
   {
     const user = (overrides = {}) => UserFactory.createUser(overrides);
     await use(user);
  }
});