import React, { useEffect } from "react";
import { View, Text, AsyncStorage, StyleSheet } from "react-native";
import {
  ConfigurationState,
  ConfigurationActionTypes,
} from "../../store/configuration/types";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { KnownActions } from "../../store/types";
import { PlatformActionTypes } from "../../store/platforms/types";

interface SplashScreenProps {
  onFinishLoading: (config: ConfigurationState | null) => void;
}

const getConfig = async () => {
  try {
    const value = await AsyncStorage.getItem("config");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

export function SplashScreen({ onFinishLoading }: SplashScreenProps) {
  const dispatch = useDispatch<Dispatch<KnownActions>>();

  useEffect(() => {
    getConfig().then((value: ConfigurationState | null) => {
      if (value !== null) {
        dispatch({
          type: ConfigurationActionTypes.SET_CONFIGURATION,
          payload: {
            apiUri: value.apiUri,
          },
        });
        dispatch({ type: PlatformActionTypes.GET_PLATFORMS });
      }
      onFinishLoading(value);
    });
  }, [onFinishLoading]);

  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
