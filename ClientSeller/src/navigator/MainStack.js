import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import LoginPage from "../screens/LoginPage";
import SignUpPage from "../screens/SignUpPage";
import CreateFood from "../screens/CreateFood";
import CreateStore from "../screens/CreateStore";
import ProfilePage from "../screens/ProfilePage";

function MainStack() {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="SignUpPage" component={SignUpPage}></Stack.Screen>
        <Stack.Screen name="LoginPage" component={LoginPage}></Stack.Screen>
        <Stack.Screen name="ProfilePage" component={ProfilePage}></Stack.Screen>
        <Stack.Screen name="CreateFood" component={CreateFood}></Stack.Screen>
        <Stack.Screen name="CreateStore" component={CreateStore}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default MainStack
