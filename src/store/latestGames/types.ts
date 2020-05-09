export interface ILatestGame {
  id: string;
  name: string;
}

export interface LatestGamesState {
  byId: Record<string, ILatestGame>;
  allIds: string[];
}
export enum LatestGamesActionTypes {
  GET_LATEST_GAMES = "@@latestGames/GET_LATEST_GAMES",
  GET_LATEST_GAMES_SUCCESS = "@@latestGames/GET_LATEST_GAMES_SUCCESS",
  GET_LATEST_GAMES_FAILED = "@@latestGames/GET_LATEST_GAMES_FAILED",
}

export interface GetLatestGamesAction {
  type: typeof LatestGamesActionTypes.GET_LATEST_GAMES;
  payload: {
    count: number;
  };
}

export interface GetLatestGamesSuccessAction {
  type: typeof LatestGamesActionTypes.GET_LATEST_GAMES_SUCCESS;
  payload: {
    latestGames: ILatestGame[];
  };
}

export interface GetLatestGamesFailedAction {
  type: typeof LatestGamesActionTypes.GET_LATEST_GAMES_FAILED;
  payload: {
    error: any;
  };
}

export type LatestGamesActions =
  | GetLatestGamesAction
  | GetLatestGamesSuccessAction
  | GetLatestGamesFailedAction;
