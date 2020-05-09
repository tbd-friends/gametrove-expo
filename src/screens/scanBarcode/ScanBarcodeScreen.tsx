import React, { useState, useEffect, useLayoutEffect } from "react";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { AppState } from "../../store/types";
import Axios from "axios";
import {
  ScanScreenNavigationProp,
  ScanScreenRouteProps,
} from "../../routes/types";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IGame } from "../../store/game/types";

interface ScanBarcodeScreenProps {
  navigation: ScanScreenNavigationProp;
  route: ScanScreenRouteProps;
}

export function ScanBarcodeScreen({
  navigation,
  route,
}: ScanBarcodeScreenProps) {
  const baseUri = useSelector<AppState, string>(
    (state) => state.configuration.apiUri
  );
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

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

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
    setScanned(true);

    Axios.get<IGame>(`/games/codes/${data}`, { baseURL: baseUri })
      .then((result) => {
        if (result.status === 200) {
          navigation.push("GameDetails", { game: result.data });
        } else {
          navigation.push("RegisterGame", {
            code: data,
            homeKey: route.params.homeKey,
          });
        }
      })
      .catch((reason) => {
        console.log("Reason: ", reason);
        navigation.push("RegisterGame", {
          code: data,
          homeKey: route.params.homeKey,
        });
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? (undefined as any) : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
