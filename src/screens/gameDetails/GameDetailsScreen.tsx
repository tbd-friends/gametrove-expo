import React, { useCallback, useLayoutEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { AppState } from "../../store/types";
import { IPlatform } from "../../store/platforms/types";
import {
  GameDetailsScreenNavigationProp,
  GameDetailsScreenRouteProps,
} from "../../routes/types";
import { Text, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface GameDetailsScreenProps {
  navigation: GameDetailsScreenNavigationProp;
  route: GameDetailsScreenRouteProps;
}

export function GameDetailsScreen({
  navigation,
  route,
}: GameDetailsScreenProps) {
  const platforms = useSelector<AppState, Record<string, IPlatform>>(
    (state) => state.platforms.byId
  );

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
  console.log(platforms);
  return (
    <View>
      <Text h4>Name: {route.params.game.name}</Text>
      <Text h4>Description: {route.params.game.description}</Text>
      <Text h4>Platform: {route.params.game.platform}</Text>
    </View>
  );
}
