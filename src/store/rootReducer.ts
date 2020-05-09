import { combineReducers, Reducer } from "redux";
import { AppState, KnownActions } from "./types";
import { reducer as configurationReducer } from "./configuration/reducer";
import { reducer as latestGamesReducer } from "./latestGames/reducer";
import { reducer as platformsReducer } from "./platforms/reducer";

export const rootReducer: Reducer<AppState, KnownActions> = combineReducers({
  configuration: configurationReducer,
  latestGames: latestGamesReducer,
  platforms: platformsReducer,
});
