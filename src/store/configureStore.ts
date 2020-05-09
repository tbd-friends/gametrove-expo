import { createStore, applyMiddleware, Middleware, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./rootReducer";
import { createLatestGamesMiddleware } from "./latestGames/createLatestGamesMiddleware";
import { createPlatformsMiddleware } from "./platforms/createPlatformsMiddleware";
import { createGameMiddleware } from "./game/createGameMiddleware";

export const configureStore = () => {
  const middleware: Middleware[] = [
    createLatestGamesMiddleware(),
    createPlatformsMiddleware(),
    createGameMiddleware(),
  ];
  const enhancers: StoreEnhancer[] = [];

  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware), ...enhancers)
  );
};
