import { chromium , test, Browser, expect} from "@playwright/test";

// test ("",async () => {
//   const browser: Browser & { process?: () => import('child_process').ChildProcess } = await chromium.launch();
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto("https://example.com");
//   console.log("Browser PID:", browser.process?.()?.pid);
//   await browser.close();
// });


test ("Check browser load state", async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.redbus.com", { waitUntil: 'domcontentloaded' });
  console.log("✅ DOM ready but images might still load.");

  await page.waitForLoadState('load');
  console.log("✅ Page fully loaded.");

  await page.waitForLoadState('networkidle');
  console.log("✅ No more network calls, page is stable.");

  await browser.close();
});





