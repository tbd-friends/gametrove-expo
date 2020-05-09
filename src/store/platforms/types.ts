export interface IPlatform {
  id: string;
  name: string;
}

export interface PlatformsState {
  byId: Record<string, IPlatform>;
  allIds: string[];
}

export enum PlatformActionTypes {
  GET_PLATFORMS = "@@platform/GET_PLATFORMS",
  GET_PLATFORMS_SUCCESS = "@@platform/GET_PLATFORMS_SUCCESS",
  GET_PLATFORMS_FAILED = "@@platform/GET_PLATFORMS_FAILED",
}

export interface GetPlatformsAction {
  type: typeof PlatformActionTypes.GET_PLATFORMS;
}

export interface GetPlatformsSuccessAction {
  type: typeof PlatformActionTypes.GET_PLATFORMS_SUCCESS;
  payload: {
    platforms: IPlatform[];
  };
}

export interface GetPlatformsFailedAction {
  type: typeof PlatformActionTypes.GET_PLATFORMS_FAILED;
  payload: {
    error: any;
  };
}

export type PlatformActions =
  | GetPlatformsAction
  | GetPlatformsSuccessAction
  | GetPlatformsFailedAction;
