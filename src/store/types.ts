import {
  ConfigurationState,
  ConfigurationActions,
} from "./configuration/types";
import { LatestGamesState, LatestGamesActions } from "./latestGames/types";
import { PlatformActions, PlatformsState } from "./platforms/types";
import { GameActions } from "./game/types";

export interface AppState {
  configuration: ConfigurationState;
  latestGames: LatestGamesState;
  platforms: PlatformsState;
}

export type KnownActions =
  | ConfigurationActions
  | LatestGamesActions
  | PlatformActions
  | GameActions;
