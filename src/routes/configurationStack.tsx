import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ConfigurationScreen } from "../screens/configuration/ConfigurationScreen";
import {
  ConfigurationStackParamsList,
  ConfigurationStackNavigationProp,
  ConfigurationStackRouteProps,
} from "./types";
import { Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator<ConfigurationStackParamsList>();

export interface ConfigurationStackProps {
  navigation: ConfigurationStackNavigationProp;
  route: ConfigurationStackRouteProps;
}

export function ConfigurationStack({ navigation }: ConfigurationStackProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Configuration"
        component={ConfigurationScreen}
        initialParams={{ drawerNavigation: navigation }}
        options={{
          headerStyle: { backgroundColor: "rgb(36, 153, 255)" },
          headerTitleStyle: { color: "#fff" },
          headerLeft: () => (
            <View style={styles.headerButtonContainer}>
              <Button
                icon={<Icon name="menu" size={25} color="#fff" />}
                onPress={() => navigation.openDrawer()}
                type="clear"
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
