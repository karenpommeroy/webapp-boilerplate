import {expect, test} from "@playwright/test";

import {getLocalStorageItem} from "./_helpers";

test("changes theme modes correctly", async ({page}) => {
    await page.goto("/");

    const themeSwitcherEl = page.getByTestId("theme-switcher");

    const htmlEl = page.locator("html");

    await expect(themeSwitcherEl).toBeVisible();
    await expect(htmlEl).toHaveAttribute("data-theme-mode", "light");
    await expect(themeSwitcherEl.getByTestId("ComputerRoundedIcon")).toBeVisible();

    expect(await getLocalStorageItem("toolpad-mode", page)).toBeNull();

    await themeSwitcherEl.click();
    await expect(htmlEl).toHaveAttribute("data-theme-mode", "dark");
    await expect(themeSwitcherEl.getByTestId("LightModeRoundedIcon")).toBeVisible();
    expect(await getLocalStorageItem("toolpad-mode", page)).toBe("dark");

    await themeSwitcherEl.click();
    await expect(htmlEl).toHaveAttribute("data-theme-mode", "light");
    await expect(themeSwitcherEl.getByTestId("DarkModeRoundedIcon")).toBeVisible();
    expect(await getLocalStorageItem("toolpad-mode", page)).toBe("light");
});
