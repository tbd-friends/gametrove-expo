export interface IGame {
  id: string;
  name: string;
  description: string;
  code: string;
  platform: string;
  registered: string;
}

export interface GameState {
  game: IGame;
}

export enum GamesActionTypes {
  GET_GAME = "@@latestGames/GET_GAME",
  GET_GAME_SUCCESS = "@@latestGames/GET_GAME_SUCCESS",
  GET_GAME_FAILED = "@@latestGames/GET_GAME_FAILED",
  REGISTER_GAME = "@@latestGames/REGISTER_GAME",
  REGISTER_GAME_SUCCESS = "@@latestGames/REGISTER_GAME_SUCCESS",
  REGISTER_GAME_FAILED = "@@latestGames/REGISTER_GAME_FAILED",
}

export interface GetGameAction {
  type: typeof GamesActionTypes.GET_GAME;
  payload: {
    id: string;
  };
}

export interface GetGameSuccessAction {
  type: typeof GamesActionTypes.GET_GAME_SUCCESS;
  payload: {
    game: IGame;
  };
}

export interface GetGameFailedAction {
  type: typeof GamesActionTypes.GET_GAME_FAILED;
  payload: {
    error: any;
  };
}

export interface RegisterGameAction {
  type: typeof GamesActionTypes.REGISTER_GAME;
  payload: {
    game: Omit<IGame, "id" | "registered">;
  };
}

export interface RegisterGameSuccessAction {
  type: typeof GamesActionTypes.REGISTER_GAME_SUCCESS;
}

export interface RegisterGameFailedAction {
  type: typeof GamesActionTypes.REGISTER_GAME_FAILED;
  payload: {
    error: any;
  };
}

export type GameActions =
  | GetGameAction
  | GetGameSuccessAction
  | GetGameFailedAction
  | RegisterGameAction
  | RegisterGameSuccessAction
  | RegisterGameFailedAction;
