import { Middleware, Dispatch, MiddlewareAPI } from "redux";
import { KnownActions, AppState } from "../types";
import {
  LatestGamesActions,
  LatestGamesActionTypes,
  ILatestGame,
} from "./types";
import Axios from "axios";

export const createLatestGamesMiddleware = (): Middleware => {
  return ({
    dispatch,
    getState,
  }: MiddlewareAPI<Dispatch<KnownActions>, AppState>) => (next: Dispatch) => (
    action: KnownActions
  ) => {
    var state = getState();
    switch (action.type) {
      case LatestGamesActionTypes.GET_LATEST_GAMES:
        getLatestGames(
          state.configuration.apiUri,
          action.payload.count
        )(dispatch);
        break;
    }
    next(action);
  };
};

const getLatestGames = (baseUri: string, count: number) => (
  dispatch: Dispatch<LatestGamesActions>
) => {
  Axios.get<ILatestGame[]>(`/games/last/${count}`, {
    baseURL: baseUri,
    headers: {
      Accept: "application/json",
    },
  })
    .then((values) => {
      dispatch({
        type: LatestGamesActionTypes.GET_LATEST_GAMES_SUCCESS,
        payload: {
          latestGames: values.data,
        },
      });
    })
    .catch((reason) => {
      dispatch({
        type: LatestGamesActionTypes.GET_LATEST_GAMES_FAILED,
        payload: {
          error: reason,
        },
      });
    });
};
