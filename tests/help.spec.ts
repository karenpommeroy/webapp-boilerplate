import {expect, test} from "@playwright/test";

test("toggles help mode using button", async ({page}) => {
    await page.goto("/");

    const helpToggleEl = page.getByTestId("help-toggle");

    await expect(helpToggleEl).toBeVisible();
    await expect(helpToggleEl.getByTestId("HelpOutlineIcon")).toBeVisible();

    await helpToggleEl.click();
    await expect(helpToggleEl.getByTestId("HelpIcon")).toBeVisible();
    await helpToggleEl.click();
    await expect(helpToggleEl.getByTestId("HelpOutlineIcon")).toBeVisible();
});

test("disables help mode when `Escape` key is pressed", async ({page}) => {
    await page.goto("/");

    const helpToggleEl = page.getByTestId("help-toggle");

    await helpToggleEl.click();
    await expect(helpToggleEl.getByTestId("HelpIcon")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(helpToggleEl.getByTestId("HelpOutlineIcon")).toBeVisible();
});

test("shows help tooltip correctly", async ({page}) => {
    await page.goto("/");

    const helpToggleEl = page.getByTestId("help-toggle");
    const helpEl = page.locator('[data-help="languagePicker"]');

    await helpToggleEl.click();
    await helpEl.click();

    const helpTooltipEl = page.getByTestId("help-tooltip");
    const helpBackdropEl = page.getByTestId("help-backdrop");
    const helpHeaderEl = page.getByTestId("help-header");
    const helpContentEl = page.getByTestId("help-content");

    await expect(helpTooltipEl).toBeVisible();
    await expect(helpBackdropEl).toBeVisible();
    await expect(helpHeaderEl).toBeVisible();
    await expect(helpContentEl).toBeVisible();

    await page.mouse.click(0, 0);
    await expect(helpTooltipEl).not.toBeVisible();
    await expect(helpBackdropEl).not.toBeVisible();
    await expect(helpHeaderEl).not.toBeVisible();
    await expect(helpContentEl).not.toBeVisible();
});
