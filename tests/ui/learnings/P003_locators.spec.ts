import {chromium,test,expect} from "@playwright/test"

test("To check different Locators", async({page}) => {
    await page.goto("https://www.redbus.in");
    // const source =  page.getByRole('button', { name: 'From' });
    // await page.getByRole('button', {name: 'Search buses'}).click();

    //  const source =  page.getByRole('button', { name: /^From$/i });
    //  await page.getByRole('button', {name: /^Search(\s)?buses$/i}).click();

    // const source =  page.getByRole('button', { name: 'rom' });
    // await page.getByRole('button', {name: 'Search'}).click();

    // const source =  page.getByRole('button', { name: /rom$/i });
    // await page.getByRole('button', {name: /^Search/i}).click();

    // await expect(page.getByText('Please enter source and destination', { exact: true })).toBeVisible();

    await page.getByText("Search buses").click();
    await page.getByText("Book trains now", {exact: true}).click();
    await expect(page.getByText("Search Trains", {exact: true})).toBeVisible();

})
