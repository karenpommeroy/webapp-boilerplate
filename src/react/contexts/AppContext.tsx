import React, {createContext, FC, ReactNode, useReducer} from "react";
import {useLocalStorage} from "usehooks-ts";

import {ColorMode} from "../../common/Theme";
import {actions} from "../actions/AppActions";
import reducer from "../reducers/AppReducer";
import {createDefaultState, IAppState} from "../states/AppState";

interface IAppContext {
    state: IAppState;
    actions: {
        setLocation: (location: string) => void;
        setTheme: (theme: string) => void;
        setMode: (mode: ColorMode) => void;
        setLoading: (loading: boolean) => void;
        setHelp: (help: boolean) => void;
    };
}

interface IAppContextProviderProps {
    children: ReactNode;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppContextProvider: FC<IAppContextProviderProps> = (props: any) => {
    const [reducerState, dispatch] = useReducer(reducer, createDefaultState());
    const reducerActions = actions(dispatch);

    const [theme, setTheme] = useLocalStorage<string>("appTheme", reducerState.theme);
    const [mode, setMode] = useLocalStorage<ColorMode>("appMode", reducerState.mode);

    const context: IAppContext = {
        state: {...reducerState, theme, mode},
        actions: {
            ...reducerActions,
            setTheme: (t: string) => {
                setTheme(t);
                reducerActions.setTheme(t);
            },
            setMode: (m: ColorMode) => {
                setMode(m);
                reducerActions.setMode(m);
            },
        },
    };

    return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>;
};

export const useAppContext = (): IAppContext => {
    const context = React.useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within AppContextProvider");
    }

    return context;
};

export default AppContext;
