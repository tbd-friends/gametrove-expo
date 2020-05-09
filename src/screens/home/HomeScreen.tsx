import React, { useEffect, useLayoutEffect } from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { KnownActions, AppState } from "../../store/types";
import {
  LatestGamesActionTypes,
  ILatestGame,
} from "../../store/latestGames/types";
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProps,
} from "../../routes/types";
import { SearchBar, Button, ListItem, Text, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Axios from "axios";
import { IGame } from "../../store/game/types";

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProps;
}

export function HomeScreen({ navigation, route }: HomeScreenProps) {
  const baseUri = useSelector<AppState, string>(
    (state) => state.configuration.apiUri
  );
  const latestGames = useSelector<AppState, ILatestGame[]>((state) =>
    state.latestGames.allIds.map((key) => state.latestGames.byId[key])
  );
  const dispatch = useDispatch<Dispatch<KnownActions>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.headerButtonContainer}>
          <Button
            icon={<Icon name="menu" size={25} color="#fff" />}
            onPress={() => {
              route.params.rootNavigation.openDrawer();
            }}
            type="clear"
          />
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerButtonContainer}>
          <Button
            icon={<Icon name="plus-circle-outline" size={25} color="#fff" />}
            onPress={() => {
              navigation.push("RegisterGame", { code: "", homeKey: route.key });
            }}
            type="clear"
          />
          <Button
            icon={<Icon name="barcode-scan" size={25} color="#fff" />}
            onPress={() => {
              navigation.push("Scan", { homeKey: route.key });
            }}
            type="clear"
          />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch({
        type: LatestGamesActionTypes.GET_LATEST_GAMES,
        payload: {
          count: 10,
        },
      });
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  return (
    <View>
      <SearchBar platform="android" placeholder="Search..." />
      <ScrollView>
        <Card title="Recently Added" wrapperStyle={{ padding: 0 }}>
          <FlatList
            data={latestGames}
            renderItem={({ item }) => (
              <Button
                key={item.id}
                title={item.name}
                onPress={() => {
                  Axios.get<IGame>(`/games/${item.id}`, { baseURL: baseUri })
                    .then((result) => {
                      navigation.push("GameDetails", { game: result.data });
                    })
                    .catch((reason) => {
                      console.log("Reason: ", reason);
                    });
                }}
                type="clear"
              />
            )}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
