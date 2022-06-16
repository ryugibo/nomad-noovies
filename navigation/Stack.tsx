import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { TouchableOpacity, View, Text } from "react-native";
import { YELLOW_COLOR } from "../colors";

const ScreenOne: React.FC<NativeStackScreenProps<any, "One">> = ({
  navigation: { navigate },
}) => {
  return (
    <TouchableOpacity onPress={() => navigate("Two")}>
      <Text>Go to Two</Text>
    </TouchableOpacity>
  );
};
const ScreenTwo: React.FC<NativeStackScreenProps<any, "Two">> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Go to Three</Text>
  </TouchableOpacity>
);
const ScreenThree: React.FC<NativeStackScreenProps<any, "Three">> = ({
  navigation: { setOptions, goBack, navigate },
}) => (
  <View>
    <TouchableOpacity onPress={() => setOptions({ title: "Hello@" })}>
      <Text>Change title</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => goBack()}>
      <Text>Go back</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
      <Text>Go to search</Text>
    </TouchableOpacity>
  </View>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      animation: "slide_from_bottom",
      headerTintColor: YELLOW_COLOR,
      headerBackTitleVisible: false,
    }}
  >
    <NativeStack.Screen
      name="One"
      component={ScreenOne}
      options={{ title: "1" }}
    />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
