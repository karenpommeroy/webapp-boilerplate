import {Page} from "@playwright/test";

export const getTestProperty = async <TResult>(
    name: string,
    page: Page
): Promise<TResult extends any[] ? TResult : undefined> => {
    const testPropsEl = page.locator("#test-props");
    const data = await testPropsEl.getAttribute(name);

    if (!data) {
        return [] as unknown as TResult extends any[] ? TResult : undefined;
    }

    return JSON.parse(data) as TResult extends any[] ? TResult : undefined;
};

export const getLocalStorageItem = async (key: string, page: Page): Promise<string | null> => {
    return page.evaluate((key: string) => localStorage.getItem(key), key);
};
