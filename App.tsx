import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { configureStore } from "./src/store/configureStore";
import { AppRoot } from "./AppRoot";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
}
