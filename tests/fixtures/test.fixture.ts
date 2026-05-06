//Logger auto-fixture   

import {test as base} from '@playwright/test';

type customTestFixtures = {

logger: void;

 } 

export const test  = base.extend<customTestFixtures>
({
    logger: [async({}, use, testInfo) => {
       console.log(`Starting ${testInfo.title}`);
       await use();
       console.log(`Completed ${testInfo.title}`);
    },{ auto: true }
    ]
})