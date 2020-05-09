import { Reducer } from "redux";
import {
  LatestGamesState,
  LatestGamesActionTypes,
  LatestGamesActions,
  ILatestGame,
} from "./types";

const initialState: LatestGamesState = {
  byId: {},
  allIds: [],
};

export const reducer: Reducer<LatestGamesState, LatestGamesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LatestGamesActionTypes.GET_LATEST_GAMES_SUCCESS:
      return {
        ...state,
        allIds: action.payload.latestGames.map((e) => e.id),
        byId: action.payload.latestGames.reduce<Record<string, ILatestGame>>(
          (a, e) => {
            a[e.id] = e;
            return a;
          },
          {}
        ),
      };
    default:
      return state;
  }
};
