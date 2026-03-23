    import {test, expect} from '@playwright/test';
    import {accountConfig} from '../../utilities/saucedemo/env.js';

    test("To validate login", async ({page})=>{
        
    await page.goto(accountConfig.baseurl);
    await page.getByPlaceholder('Username').fill(accountConfig.username);
    await page.getByPlaceholder('Password').fill(accountConfig.password);
    await page.getByRole("button", {name:'Login'}).click();
    await expect(page).toHaveURL(/inventory/);

    })