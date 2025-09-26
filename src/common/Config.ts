export interface IConfiguration {
    appName: string;
    url: string;
    port: number;
    environment: string;
    themes: string[];
}

export const getConfiguration = <TConfig>(url: string): Promise<TConfig> => {
    return fetch(url).then(async (response: Response) => {
        return Object.freeze(await response.json()) as TConfig;
    });
};
