import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Room from "./Room";
import DirectMessage from "./DirectMessage";
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Text, View, Animated, Dimensions } from "react-native";
const ChatStack = createNativeStackNavigator();


export default function ListChat() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen component={Room} name="Room" />
    </ChatStack.Navigator>
  );
}
