import {expect, test} from "@playwright/test";

import {getTestProperty} from "./_helpers";

test("changes languages correctly", async ({page}) => {
    await page.goto("/");

    const languages = await getTestProperty<string[]>("data-languages", page);
    const languagePickerEl = page.getByTestId("language-picker");
    const languagePickerTriggerEl = page.getByTestId("language-picker-trigger");
    const appEl = page.getByTestId("app");

    await expect(page.getByTestId("app")).toHaveAttribute("lang");
    await expect(languagePickerEl).toBeVisible();
    await expect(languagePickerTriggerEl).toBeVisible();

    for (const lang of languages) {
        await languagePickerTriggerEl.click();
        await languagePickerEl.locator(`[role="menu"] [role="menuitem"][data-id="${lang}"]`).click();
        await expect(languagePickerEl.locator('[role="menu"]')).toBeHidden();
        await expect(appEl).toHaveAttribute("lang", lang);
        await expect(languagePickerTriggerEl.locator(`[style*="/${lang}/flag.svg"]`)).toBeVisible();
    }
});

test("click away closes language menu", async ({page}) => {
    await page.goto("/");

    const languagePickerEl = page.getByTestId("language-picker");
    const languagePickerTriggerEl = page.getByTestId("language-picker-trigger");

    await languagePickerTriggerEl.click();
    await expect(languagePickerEl.locator('[role="menu"]')).toBeVisible();
    await page.mouse.click(0, 0);
    await expect(languagePickerEl.locator('[role="menu"]')).toBeHidden();
});
