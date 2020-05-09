import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import {
  HomeStackParamsList,
  HomeStackNavigationProp,
  HomeStackRouteProps,
} from "./types";
import { ScanBarcodeScreen } from "../screens/scanBarcode/ScanBarcodeScreen";
import { RegisterGameScreen } from "../screens/registerGame/RegisterGameScreen";
import { GameDetailsScreen } from "../screens/gameDetails/GameDetailsScreen";

const Stack = createStackNavigator<HomeStackParamsList>();

interface HomeStackProps {
  navigation: HomeStackNavigationProp;
  route: HomeStackRouteProps;
}

const commonOptions = {
  headerStyle: { backgroundColor: "rgb(56, 153, 255)" },
  headerTitleStyle: { color: "#fff" },
  headerTintColor: "#fff",
};

export function HomeStack({ navigation }: HomeStackProps) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ rootNavigation: navigation }}
        options={{
          ...commonOptions,
        }}
      />
      <Stack.Screen
        name="Scan"
        component={ScanBarcodeScreen}
        options={{
          ...commonOptions,
        }}
      />
      <Stack.Screen
        name="RegisterGame"
        component={RegisterGameScreen}
        options={{
          ...commonOptions,
          title: "Register Game",
        }}
      />
      <Stack.Screen
        name="GameDetails"
        component={GameDetailsScreen}
        options={{
          ...commonOptions,
          title: "Game Details",
        }}
      />
    </Stack.Navigator>
  );
}
