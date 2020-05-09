import React, { useCallback, useLayoutEffect } from "react";
import { View } from "react-native";
import {
  RegisterGameScreenNavigationProp,
  RegisterGameScreenRouteProps,
} from "../../routes/types";
import { RegisterGameForm } from "./RegisterGameForm";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { KnownActions, AppState } from "../../store/types";
import { IPlatform } from "../../store/platforms/types";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GamesActionTypes, IGame } from "../../store/game/types";

interface RegisterGameScreenProps {
  navigation: RegisterGameScreenNavigationProp;
  route: RegisterGameScreenRouteProps;
}

export function RegisterGameScreen({
  navigation,
  route,
}: RegisterGameScreenProps) {
  const platforms = useSelector<AppState, IPlatform[]>((state) =>
    state.platforms.allIds.map((key) => state.platforms.byId[key])
  );
  const dispatch = useDispatch<Dispatch<KnownActions>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          <Button
            icon={<Icon name="arrow-left" size={25} color="#fff" />}
            onPress={() => navigation.goBack()}
            type="clear"
          />
        </View>
      ),
    });
  }, [navigation]);

  const handleRegisterGameSubmitted = useCallback(
    (values: Omit<IGame, "id" | "registered">) => {
      dispatch({
        type: GamesActionTypes.REGISTER_GAME,
        payload: { game: values },
      });
    },
    [dispatch]
  );

  return (
    <View>
      <RegisterGameForm
        onSubmit={handleRegisterGameSubmitted}
        initialValues={{
          name: "",
          description: "",
          code: route.params && route.params.code ? route.params.code : "",
          platform: "",
        }}
        platforms={platforms}
      />
    </View>
  );
}
