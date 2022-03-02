import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

import {
  Home,
  Photoview,
  Category,
} from '../screens';
const Routes = () => {
  return (
    <Stack.Navigator
      animationTypeForReplace='push'
      initialRouteName='HomePage'
      options={{
        headerShown: false,
        presentation: true,
        animationEnabled: true,
      }} 
      mode="modal">
      <Stack.Screen name='HomePage' component={Home} options={{ headerShown: false }} />
      <Stack.Screen name='Photoview' component={Photoview} options={{ headerShown: false }} />
      <Stack.Screen name='Category' component={Category} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default Routes