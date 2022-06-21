import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";
import { Movie, TV } from "../api";

export type RootStackParamList = {
  Tabs: undefined;
  Stack: { screen: string; params: Movie | TV };
};

const Nav = createNativeStackNavigator<RootStackParamList>();

const Root = () => (
  <Nav.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
);

export default Root;
