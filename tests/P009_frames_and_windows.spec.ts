import {test,expect} from '@playwright/test';

test ("To click nested frame element", async({page}) => {

    await page.goto("https://leafground.com/frame.xhtml")
    const parent_frame = page.frameLocator("iframe[src='page.xhtml']");
    const child_frame = parent_frame.frameLocator("iframe[src='framebutton.xhtml']")
    const button_nested = child_frame.
    getByRole("button", {name:"Click Me"});
    const button_text_nested = child_frame.
    getByRole("button", {name:"Hurray! You Clicked Me."});
    await button_nested.click();
    await expect(button_text_nested).toBeVisible();

})

test("To handle element in new tab", async({context,page}) => {
    await page.goto("https://leafground.com/window.xhtml");
    const new_window_button = page.getByRole("button", {name:"Open with delay"})
    const [newPage] =  await Promise.all(
    [context.waitForEvent("page"),
    new_window_button.click()]);    
    await newPage.waitForLoadState()
    await expect(newPage).toHaveURL(/.*table/);
    await newPage.close();
    page.bringToFront();
    await expect(new_window_button).toBeVisible();

})

test.only("To validate multiple windows", async({page,context}) => {
    await page.goto("https://www.hyrtutorials.com/p/window-handles-practice.html");
    const open_pages = []
    context.on('page',(newPage) => {
    open_pages.push(newPage);
    })

    await page.locator("#newTabsBtn").click();
    await expect.poll(() => open_pages.length,{message: "Waiting for 2 new tabs to be registered",
        timeout: 10000,}).toBe(2);

    for(const tab of open_pages)
    {   await tab.waitForLoadState().catch(() => {});
        await tab.close().catch(() => {});
    }
})

