import {test} from '../fixtures/api.fixture.js';
import {expect} from '@playwright/test';
import {AuthService} from '../../services/auth.js'
import { accountConfig } from '../../utilities/api/env.js';


test("To validate login response", async({authService}) => {
const response = await authService.login(accountConfig.username, accountConfig.password);
expect(response.status).toBe(200);
expect(response.body?.accessToken).toBeDefined;
})

test("To validate personal details response", async({authService, authToken}) => {  
const response = await authService.getDetails(authToken);
expect(response.status).toBe(200);
expect(response.body?.firstName).toBeDefined;
expect(response.body?.firstName).toBe(accountConfig.username)
})