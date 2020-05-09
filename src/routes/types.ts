import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { IGame } from "../store/game/types";

export type RootDrawerParamsList = {
  Home: undefined;
  Configuration: { rootNavigation: HomeStackNavigationProp };
};

export type HomeStackNavigationProp = DrawerNavigationProp<
  RootDrawerParamsList,
  "Home"
>;

export type HomeStackRouteProps = RouteProp<RootDrawerParamsList, "Home">;

export type ConfigurationStackNavigationProp = DrawerNavigationProp<
  RootDrawerParamsList,
  "Configuration"
>;

export type ConfigurationStackRouteProps = RouteProp<
  RootDrawerParamsList,
  "Configuration"
>;

export type HomeStackParamsList = {
  Home: { rootNavigation: HomeStackNavigationProp };
  Scan: { homeKey: string };
  RegisterGame: { code?: string; homeKey: string };
  GameDetails: { game: IGame };
};

export type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamsList,
  "Home"
>;

export type HomeScreenRouteProps = RouteProp<HomeStackParamsList, "Home">;

export type ScanScreenNavigationProp = StackNavigationProp<
  HomeStackParamsList,
  "Scan"
>;

export type ScanScreenRouteProps = RouteProp<HomeStackParamsList, "Scan">;

export type RegisterGameScreenNavigationProp = StackNavigationProp<
  HomeStackParamsList,
  "RegisterGame"
>;

export type RegisterGameScreenRouteProps = RouteProp<
  HomeStackParamsList,
  "RegisterGame"
>;

export type GameDetailsScreenNavigationProp = StackNavigationProp<
  HomeStackParamsList,
  "GameDetails"
>;

export type GameDetailsScreenRouteProps = RouteProp<
  HomeStackParamsList,
  "GameDetails"
>;

export type ConfigurationStackParamsList = {
  Configuration: { drawerNavigation: ConfigurationStackNavigationProp };
};

export type ConfigurationScreenNavigationProp = StackNavigationProp<
  ConfigurationStackParamsList,
  "Configuration"
>;

export type ConfigurationScreenRouteProps = RouteProp<
  ConfigurationStackParamsList,
  "Configuration"
>;
