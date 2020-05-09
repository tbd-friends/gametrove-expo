import React, { useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SplashScreen } from "./src/screens/splash/SplashScreen";
import { RootDrawer } from "./src/routes/rootDrawer";

export function AppRoot() {
  const [state, setState] = useState({ isLoading: true });

  const handleFinishedLoading = useCallback(() => {
    setState({ isLoading: false });
  }, []);

  if (state.isLoading) {
    return <SplashScreen onFinishLoading={handleFinishedLoading} />;
  }

  return (
    <NavigationContainer>
      <RootDrawer />
    </NavigationContainer>
  );
}
