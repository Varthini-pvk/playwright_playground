// fixtures for dynamic test data generation

import {test as base} from './test.fixture.js';
import { buildUser } from '../../utilities/common/dataBuilder.js'

type dataFixtures = {
randomUser: ReturnType<typeof buildUser>

}

export const test = base.extend<dataFixtures>({
   randomUser: async({},use) =>
   {
     const user = buildUser();
     await use(user);
  }
});