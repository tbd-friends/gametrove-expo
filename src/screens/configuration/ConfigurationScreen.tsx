import React, { useCallback } from "react";
import { View, AsyncStorage } from "react-native";
import {
  ConfigurationState,
  ConfigurationActionTypes,
} from "../../store/configuration/types";
import { ConfigurationForm } from "./ConfigurationForm";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
  ConfigurationScreenNavigationProp,
  ConfigurationScreenRouteProps,
} from "../../routes/types";
import { AppState, KnownActions } from "../../store/types";
import { PlatformActionTypes } from "../../store/platforms/types";

interface ConfigurationScreenProps {
  onConfigurationSubmitted: (config: ConfigurationState) => void;
  navigation: ConfigurationScreenNavigationProp;
  route: ConfigurationScreenRouteProps;
}

const storeConfig = async (config: any) => {
  try {
    await AsyncStorage.setItem("config", JSON.stringify(config));
  } catch (error) {
    console.log(error);
  }
};

export function ConfigurationScreen({
  onConfigurationSubmitted,
  ...props
}: ConfigurationScreenProps) {
  const config = useSelector<AppState, ConfigurationState>(
    (state) => state.configuration
  );
  const dispatch = useDispatch<Dispatch<KnownActions>>();

  const handleConfigurationSubmitted = useCallback(
    (values: ConfigurationState) => {
      storeConfig(values);
      dispatch({
        type: ConfigurationActionTypes.SET_CONFIGURATION,
        payload: {
          apiUri: values.apiUri,
        },
      });
      dispatch({ type: PlatformActionTypes.GET_PLATFORMS });
      props.route.params.drawerNavigation.navigate("Home");
    },
    [dispatch]
  );

  return (
    <View>
      <ConfigurationForm
        onSubmit={handleConfigurationSubmitted}
        initialValues={config}
      />
    </View>
  );
}
