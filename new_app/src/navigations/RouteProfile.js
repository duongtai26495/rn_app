import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

import {
  Profile,
  Authen
} from '../screens';
const Routes = () => {
  return (
    <Stack.Navigator initialRouteName='UserProfile' options={{ headerShown: false }} headerMode="none" mode="modal">
      <Stack.Screen name='UserProfile' component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name='Authen' component={Authen} options={{ headerShown: false}} />
    </Stack.Navigator>
  )
}

export default Routes