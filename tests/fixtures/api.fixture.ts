import {test as base} from '@playwright/test';
import { ApiClient } from "../../core/api/ApiClient.js";
import { UserService } from '../../services/User.js'
import { api_key, isDebug } from '../../utilities/api/env.js';

type customFixtures = {
    apiclient: ApiClient;
    userService: UserService;
}

type workerFixtures = {
  baseheader: Record<string, string>;
  authheader: Record<string, string>;
};


export const test = base.extend<customFixtures,workerFixtures>
({

    baseheader: [async({},use) => {
        await use({'Content-Type': 'application/json'});},{ scope: 'worker' }],
   
    authheader: [async({baseheader},use) => {
        await use({...baseheader,'x-api-key': api_key});

    },{ scope: 'worker' }],

    apiclient : async ({request}, use) => {
        const api = new ApiClient(request);
        if (isDebug) console.log("ApiClient initialized");
        await use(api);
        if (isDebug) console.log("ApiClient cleaned");
    },

    userService : async({apiclient, authheader}, use) => {
        const user = new UserService(apiclient, authheader);
        await use(user);
    },
})

