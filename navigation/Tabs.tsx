import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { YELLOW_COLOR, BLACK_COLOR, DARK_GREY, LIGHT_GREY } from "../colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Tabs: { title: string };
};

type TabsScreenProps = NativeStackScreenProps<RootStackParamList, "Tabs">;

const Tab = createBottomTabNavigator();

const Tabs: React.FC<TabsScreenProps> = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : "white",
      }}
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? LIGHT_GREY : DARK_GREY,
        tabBarLabelStyle: { marginTop: -5, fontSize: 12, fontWeight: "600" },
        headerStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
        headerTitleStyle: { color: isDark ? "white" : BLACK_COLOR },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="film-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="tv-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="search-outline" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
