import{test,expect} from '@playwright/test'
import {upload_path,download_path} from '../utilities/paths'
import {resolve} from 'node:path'
import {existsSync} from 'node:fs'

test ("To validate file upload", async({page}) => {
    await page.goto("https://leafground.com/file.xhtml");
    const files_to_upload = [resolve(upload_path,'sample_upload_1.txt')];
    await page.getByText("Basic Upload").locator("..").locator("input[type='file']").setInputFiles(files_to_upload);
    await page.waitForTimeout(1000);

})

test("To validate file download", async({page}) => {
    
    await page.goto("https://leafground.com/file.xhtml");
   
    const [download_promise] = await Promise.all([
      page.waitForEvent('download'),
        page.getByRole("button", {name:'Download'}).click()
    ]);
    const filepath = resolve(download_path,download_promise.suggestedFilename());
    await download_promise.saveAs(filepath);
    expect(existsSync(filepath)).toBeTruthy();

})