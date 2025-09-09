import {merge} from "lodash-es";
import React, {createContext, FC, PropsWithChildren, useContext, useState} from "react";

import {IConfiguration} from "../../common/Config";

export interface ISettingsProps {
    config?: IConfiguration;
}

export interface ISettingsProviderProps extends ISettingsProps, PropsWithChildren {}

const defaultState = {};

export const SettingsContext = createContext<ISettingsProps>(defaultState);

export const SettingsProvider: FC<ISettingsProviderProps> = (props: ISettingsProviderProps) => {
    const {children, ...rest} = props;
    const mergedState = merge(defaultState, rest);
    const [config, setConfig] = useState<IConfiguration>(mergedState.config);

    return <SettingsContext.Provider value={{config}}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);

export default SettingsContext;
