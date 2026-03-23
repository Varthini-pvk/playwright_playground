import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

// #region agent log
fetch('http://127.0.0.1:7872/ingest/c224b366-5c96-4e03-86f0-6eb731f3e856', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '702e36' },
  body: JSON.stringify({
    sessionId: '702e36',
    runId: 'pre-fix',
    hypothesisId: 'H3',
    location: 'tests/P010_fileUpload.spec.ts:1',
    message: 'fileUpload spec evaluated (before paths import)',
    data: {
      nodeVersion: process.version,
      hasFetch: typeof fetch,
      hasExports: typeof (globalThis as any).exports,
      hasModule: typeof (globalThis as any).module,
      hasRequire: typeof (globalThis as any).require,
    },
    timestamp: Date.now(),
  }),
}).catch(() => {});
// #endregion

test ("To validate file upload", async({page}) => {
    await page.goto("https://leafground.com/file.xhtml");
    const { upload_path } = await import('../../utilities/paths.js');
    const files_to_upload = [resolve(upload_path, 'sample_upload_1.txt')];
    await page.getByText("Basic Upload").locator("..").locator("input[type='file']").setInputFiles(files_to_upload);
    await page.waitForTimeout(1000);

})

test("To validate file download", async({page}) => {
    
    await page.goto("https://leafground.com/file.xhtml");
   
    const [download_promise] = await Promise.all([
      page.waitForEvent('download'),
        page.getByRole("button", {name:'Download'}).click()
    ]);
    const { download_path } = await import('../../utilities/paths.js');
    const filepath = resolve(download_path, download_promise.suggestedFilename());
    await download_promise.saveAs(filepath);
    expect(existsSync(filepath)).toBeTruthy();

})