import { View, Text, Image } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Colors from '../assets/colors/Color';
import ICONS from '../constants/default_icon_string'
import {
  Favorites,
} from '../screens';
import Routes from './Route';
import RouteProfile from './RouteProfile'
const Tab = createMaterialBottomTabNavigator()
const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor={Colors.PRIMARY}
      inactiveColor={Colors.DARK}
      shifting={true}
      barStyle={{backgroundColor:Colors.LIGHT}}>
      <Tab.Screen
        name='Home'
        component={Routes}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={ICONS.HOME}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? Colors.PRIMARY : Colors.DARK_MID
                
                }}
                 />

            </View>
          ),
        }} />
      <Tab.Screen
        name='Favorites'
        component={Favorites}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={ICONS.LIKES}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? Colors.PRIMARY : Colors.DARK_MID
                }} />

            </View>
          ),
        }} />
      <Tab.Screen
        name='Profile'
        component={RouteProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={ICONS.USER_PROFILE}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? Colors.PRIMARY : Colors.DARK_MID
                }} />

            </View>
          ),
        }} />
    </Tab.Navigator>
  )
}

export default Tabs