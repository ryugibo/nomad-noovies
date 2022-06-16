import AppLoading from "expo-app-loading";
import React from "react";
import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import Tabs from "./navigation/Tabs";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [assets] = useAssets([require("./my-face.png")]);
  const [loaded] = useFonts(Ionicons.font);
  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
