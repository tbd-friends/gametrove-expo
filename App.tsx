import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import { configureStore } from "./src/store/configureStore";
import { AppRoot } from "./AppRoot";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <AppRoot />
      <FlashMessage position="top" />
    </Provider>
  );
}
