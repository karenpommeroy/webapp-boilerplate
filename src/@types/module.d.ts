declare const module: {
    hot?: {
        accept: (dependencies?: string[] | string, callback?: () => void) => void;
        dispose: (callback: () => void) => void;
    };
};
