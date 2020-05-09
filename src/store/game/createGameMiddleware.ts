import { Middleware, Dispatch, MiddlewareAPI } from "redux";
import { KnownActions, AppState } from "../types";
import { GameActions, GamesActionTypes, IGame } from "./types";
import Axios from "axios";

export const createGameMiddleware = (): Middleware => {
  return ({
    dispatch,
    getState,
  }: MiddlewareAPI<Dispatch<KnownActions>, AppState>) => (next: Dispatch) => (
    action: KnownActions
  ) => {
    var state = getState();
    switch (action.type) {
      case GamesActionTypes.REGISTER_GAME:
        registerGame(state.configuration.apiUri, action.payload.game)(dispatch);
        break;
    }
    next(action);
  };
};

const getGame = (baseUri: string, id: string) => (
  dispatch: Dispatch<GameActions>
) => {
  Axios.get<IGame>(`/games/${id}`, {
    baseURL: baseUri,
    headers: {
      Accept: "application/json",
    },
  })
    .then((values) => {
      dispatch({
        type: GamesActionTypes.GET_GAME_SUCCESS,
        payload: {
          game: values.data,
        },
      });
    })
    .catch((reason) => {
      dispatch({
        type: GamesActionTypes.GET_GAME_FAILED,
        payload: {
          error: reason,
        },
      });
    });
};

const registerGame = (
  baseUri: string,
  game: Omit<IGame, "id" | "registered">
) => (dispatch: Dispatch<GameActions>) => {
  Axios.post<string>(`/games`, game, {
    baseURL: baseUri,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((values) => {
      dispatch({
        type: GamesActionTypes.REGISTER_GAME_SUCCESS,
      });
      console.log(values.data);
    })
    .catch((reason) => {
      dispatch({
        type: GamesActionTypes.REGISTER_GAME_FAILED,
        payload: {
          error: reason,
        },
      });
    });
};
