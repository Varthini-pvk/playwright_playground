import {test, chromium, expect} from '@playwright/test';

test ("To test different locator assertions", async ({page})=> {
    await page.goto("https://example.com");
    await expect(page).toHaveURL(/example/)
     await expect(page).toHaveTitle(/Example/)
     const more_info = await page.getByText("Learn more")
     await expect(more_info).toBeVisible();
     await expect(page.locator("h1").first()).toHaveText("example domain", {ignoreCase: true})
     await expect(page.locator("p").first()).toContainText(/documentation examples/, {ignoreCase: true})
     await expect(page.locator("a").first()).toHaveAttribute("href", /iana/, {ignoreCase: true})
})

test("Input assertions", async({page}) => {
    await page.goto("https://leafground.com/input.xhtml");
    const name_textbox = await page.getByRole("textbox", {name:/name/});
    name_textbox.fill("varthini");
    await expect(name_textbox).toHaveValue("varthini")
    await page.goto("https://leafground.com/checkbox.xhtml")
    const checkbox = await page.locator("input[type='checkbox'][aria-label='Basic']").locator(
        "xpath=ancestor::div[contains(@class,'ui-chkbox')]").
        locator(".ui-chkbox-box");
    checkbox.click();
    await expect(page.locator("input[type='checkbox'][aria-label='Basic']")).toBeChecked();
    await expect(page.locator("input[type='checkbox'][aria-label='Disabled']")).toBeDisabled();
})

test.only("Dropdown Assertions", async({page})=> 
{
page.goto("https://leafground.com/select.xhtml");
const dropdown = await page.locator(".card", {has:page.locator("h5", {hasText:"Which is your favorite UI Automation tool?"})}).locator("select.ui-selectonemenu");
await expect(dropdown.locator("option")).toHaveCount(5);
await expect(dropdown.locator("option").nth(1)).toHaveText("Selenium");
dropdown.selectOption({index:2})
await expect(dropdown).toHaveValue("Playwright");
})