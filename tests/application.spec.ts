import {expect, test} from "@playwright/test";

test("loads application", async ({page}) => {
    await page.goto("/");

    await expect(page.getByTestId("app-loader")).toBeVisible();
    await expect(page.getByTestId("dashboard")).toBeVisible();
});

test("displays application correctly", async ({page}) => {
    await page.goto("/");

    const navItems = ["home", "settings"];
    const dashboardEl = page.getByTestId("dashboard");

    await expect(dashboardEl).toBeVisible();
    await expect(dashboardEl.getByTestId("app-logo")).toBeVisible();
    await expect(dashboardEl.getByTestId("app-title")).toBeVisible();
    await expect(dashboardEl.getByTestId("app-actions")).toBeVisible();
    await expect(dashboardEl.getByTestId("app-title")).toHaveText("webapp", {ignoreCase: true});
    await expect(page.getByTestId("app")).toHaveAttribute("lang");

    for (const item of navItems) {
        await expect(dashboardEl.getByTestId(`sidebar-item-${item}`).filter({visible: true})).toHaveCount(1);
    }
});
