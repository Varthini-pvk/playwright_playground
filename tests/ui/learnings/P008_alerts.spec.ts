import {test,expect} from '@playwright/test'
const prompt_text = `Test_User_${Date.now()}`

test("to test alerts", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    handle_alert(page,prompt_text);
    await page.getByRole('button', {name: "Click for JS Alert"}).click();
    handle_alert(page,prompt_text);
    await page.getByRole('button', {name: "Click for JS Confirm"}).click();
    await expect(page.locator("#result")).toHaveText("You clicked: Cancel");
    handle_alert(page,prompt_text);
    await page.getByRole('button', {name: "Click for JS Prompt"}).click();
    await expect(page.locator("#result")).toHaveText(`You entered: ${prompt_text}`);

    
})

function handle_alert(page,prompt_text)
{
    page.once("dialog", async (current_dialog) => {
    if (current_dialog.type() === 'alert')
    {
        console.log(current_dialog.message());
        await current_dialog.accept();
    }
    if (current_dialog.type() === 'confirm')
    {
        console.log(current_dialog.message());
        await current_dialog.dismiss();
    }
    if (current_dialog.type() === 'prompt')
    {
        console.log(current_dialog.message());
        await current_dialog.accept(prompt_text);
    }

    })
}