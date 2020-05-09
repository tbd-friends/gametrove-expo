import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeStack } from "./homeStack";
import { ConfigurationStack } from "./configurationStack";
import { useSelector } from "react-redux";
import { AppState } from "../store/types";
import { ConfigurationState } from "../store/configuration/types";
import { RootDrawerParamsList } from "./types";

const Drawer = createDrawerNavigator<RootDrawerParamsList>();

export function RootDrawer() {
  const config = useSelector<AppState, ConfigurationState>(
    (state) => state.configuration
  );

  return (
    <Drawer.Navigator
      initialRouteName={config.apiUri === "" ? "Configuration" : "Home"}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Configuration" component={ConfigurationStack} />
    </Drawer.Navigator>
  );
}
