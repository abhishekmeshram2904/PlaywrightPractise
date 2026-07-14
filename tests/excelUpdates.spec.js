import { test, expect } from '@playwright/test';
import { exceltest } from '../util/excelUtil.js';

test('test', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    await download.saveAs("file\\download.xlsx");
    exceltest("Apple", 350, "file\\download.xlsx");
    await page.getByRole('button', { name: 'Choose File' }).click();
    await page.getByRole('button', { name: 'Choose File' }).setInputFiles("file\\download.xlsx");
    await expect(page.getByRole("alert")).toContainText('Updated Excel Data Successfully.');
    const textlocator = await page.getByText("Apple")
    const desriedrow = await page.getByRole('row').filter({ has: textlocator })
    await expect(desriedrow.locator("#cell-4-undefined")).toContainText('350');
    
});
