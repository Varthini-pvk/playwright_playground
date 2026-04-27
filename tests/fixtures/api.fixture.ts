import {test as base, APIRequestContext} from '@playwright/test';
import { ApiClient } from "../../core/api/ApiClient.js";
import { UserService } from '../../services/User.js'
import { api_key, isDebug } from '../../utilities/api/env.js';
import { AuthService } from '../../services/auth.js'
import { accountConfig } from '../../utilities/api/env.js';



type customFixtures = {
    apiclient: ApiClient;
    userService: UserService;
    authService: AuthService;
    authToken: string
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
        if (isDebug) console.log("Authheader building");
        await use({...baseheader,'x-api-key': api_key});
        if (isDebug) console.log("Authheader cleanedup");

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

    authService: async({apiclient, authheader}, use) => {
        const auth = new AuthService(apiclient, authheader);
        await use(auth);
    },

    authToken: async({authService},use) => {
        if (isDebug) console.log("AuthToken building");
        const response =
        await authService.login(
            accountConfig.username,
            accountConfig.password
        );

        await use(response.body!.accessToken)
       

    }
})

