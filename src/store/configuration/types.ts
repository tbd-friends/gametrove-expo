export interface ConfigurationState {
  apiUri: string;
}

export enum ConfigurationActionTypes {
  GET_CONFIGURATION = "@@configuration/GET_CONFIGURATION",
  SET_CONFIGURATION = "@@configuration/SET_CONFIGURATION",
}

export interface GetConfigurationAction {
  type: typeof ConfigurationActionTypes.GET_CONFIGURATION;
}

export interface SetConfigurationAction {
  type: typeof ConfigurationActionTypes.SET_CONFIGURATION;
  payload: {
    apiUri: string;
  };
}

export type ConfigurationActions =
  | GetConfigurationAction
  | SetConfigurationAction;
