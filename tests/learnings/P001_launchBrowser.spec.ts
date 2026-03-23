import { chromium, test, expect } from "@playwright/test";

// test("Launch a browser", async () => {
//   const browserInstance = await chromium.launch();          // Launches a new Chromium browser
//   const browserContext = await browserInstance.newContext(); // Creates a new isolated browser context
//   const page = await browserContext.newPage();               // Opens a new page (tab)
//   await page.goto("https://www.google.com");                 // Navigate to the page
//   console.log(await page.url());                             // Logs the current page URL

//   await browserInstance.close();                             // (Optional) Closes the browser after test
// });




test("Launch browser and open Google", async ({ page }) => {
  await page.goto("https://www.google.com");
  console.log(await page.url());
  await expect(page).toHaveURL("https://www.google.com/");
});
