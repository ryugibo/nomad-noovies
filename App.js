import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Text } from "react-native";

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await new Promise((resolve) => setTimeout(resolve, 10_000));
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.log}
      />
    );
  }
  return <Text>We are done loading!</Text>;
}
