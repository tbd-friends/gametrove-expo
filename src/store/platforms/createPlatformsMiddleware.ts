import { Middleware, Dispatch, MiddlewareAPI } from "redux";
import { KnownActions, AppState } from "../types";
import Axios from "axios";
import { PlatformActionTypes, PlatformActions, IPlatform } from "./types";

export const createPlatformsMiddleware = (): Middleware => {
  return ({
    dispatch,
    getState,
  }: MiddlewareAPI<Dispatch<KnownActions>, AppState>) => (next: Dispatch) => (
    action: KnownActions
  ) => {
    var state = getState();
    switch (action.type) {
      case PlatformActionTypes.GET_PLATFORMS:
        getPlatforms(state.configuration.apiUri)(dispatch);
        break;
    }
    next(action);
  };
};

const getPlatforms = (baseUri: string) => (
  dispatch: Dispatch<PlatformActions>
) => {
  Axios.get<IPlatform[]>(`/platforms`, {
    baseURL: baseUri,
    headers: {
      Accept: "application/json",
    },
  })
    .then((result) => {
      dispatch({
        type: PlatformActionTypes.GET_PLATFORMS_SUCCESS,
        payload: {
          platforms: result.data,
        },
      });
    })
    .catch((reason) => {
      dispatch({
        type: PlatformActionTypes.GET_PLATFORMS_FAILED,
        payload: {
          error: reason,
        },
      });
    });
};
