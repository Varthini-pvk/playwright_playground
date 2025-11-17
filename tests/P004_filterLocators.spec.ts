import {chromium,test,expect} from "@playwright/test";

test("To validate locator Filters", async({page}) => {
    await page.goto("https://selectorshub.com");
    await page.getByText("Practice Page", {exact:true}).click();
    expect(await page.getByRole("button").filter({hasText: "Submit"})).toBeVisible();

});

 