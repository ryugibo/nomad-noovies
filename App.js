import AppLoading from "expo-app-loading";
import React from "react";
import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [assets] = useAssets([require("./my-face.png")]);
  const [loaded] = useFonts(Ionicons.font);
  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return <Text>We are done loading!</Text>;
}
