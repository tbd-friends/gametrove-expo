import { Reducer } from "redux";
import {
  PlatformsState,
  PlatformActions,
  PlatformActionTypes,
  IPlatform,
} from "./types";

const initialState: PlatformsState = {
  byId: {},
  allIds: [],
};

export const reducer: Reducer<PlatformsState, PlatformActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PlatformActionTypes.GET_PLATFORMS_SUCCESS:
      return {
        ...state,
        allIds: action.payload.platforms.map((e) => e.id),
        byId: action.payload.platforms.reduce<Record<string, IPlatform>>(
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
