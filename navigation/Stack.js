import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View, Text } from "react-native";
import { YELLOW_COLOR } from "../colors";

const ScreenOne = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate("Two")}>
      <Text>Go to Two</Text>
    </TouchableOpacity>
  );
};
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Go to Three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { setOptions, goBack } }) => (
  <View>
    <TouchableOpacity onPress={() => setOptions({ title: "Hello@" })}>
      <Text>Change title</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => goBack()}>
      <Text>Go back</Text>
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
