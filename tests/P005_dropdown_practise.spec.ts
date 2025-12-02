import {test,expect} from "@playwright/test" ;
import path from 'path';


test("To validate dropdown", async({page}) => 
{
    const practiceFile = path.resolve(__dirname, "../resources/playwright-dropdown-practice.html");
    await page.goto('file://' + practiceFile)
    await expect(page.url()).toContain("playwright-dropdown-practice.html")

// //select a option 
const country_dropdown = page.locator('#country');
await country_dropdown.selectOption({value : "IN"});
await expect (country_dropdown).toHaveValue("IN");
await country_dropdown.selectOption({label : "United Kingdom"});
await expect (country_dropdown).toHaveValue("GB");
await country_dropdown.selectOption({index : 1});
await expect (country_dropdown).toHaveValue("US");


// //Custom dropdown 
const dropdown = page.locator("#city-dropdown")
await dropdown.click();
const drop_down_option = page.getByText("Chennai");
await expect (drop_down_option).toBeVisible();
await drop_down_option.click();
await expect (dropdown).toHaveText("Chennai")

// //Multi-select
const multi_select = page.locator("#fruits");
await multi_select.selectOption([{value : 'apple'},{label : 'Mango'}]);
await expect(page.locator("#fruits-selected")).toHaveText("Apple, Mango");


//Dynamically loaded 

// const dropdown_2 = page.locator("#district-dropdown");
// await dropdown_2.click();
// await page.getByText("Madurai").click();
// await expect(page.locator("#district-selected")).toHaveText("Madurai")

//Combobox

// await page.getByRole("combobox", {name :'Select state'}).click;
// await page.getByRole("option", {name :'Kerala'}).click;
// await expect(page.locator("#state-selected")).toHaveText("Kerala")

// Searchable dropdown
await page.locator("#search-city").fill("Beng")
await page.locator("#search-results").locator("li:has-text('Bengaluru')").click();
await expect(page.locator("#search-selected")).toHaveText("Bengaluru")



})


