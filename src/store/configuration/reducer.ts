import { Reducer } from "redux";
import {
  ConfigurationState,
  ConfigurationActions,
  ConfigurationActionTypes,
} from "./types";

const initialState: ConfigurationState = {
  apiUri: "",
};

export const reducer: Reducer<ConfigurationState, ConfigurationActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ConfigurationActionTypes.SET_CONFIGURATION: {
      return { ...state, apiUri: action.payload.apiUri };
    }
    default:
      return state;
  }
};
