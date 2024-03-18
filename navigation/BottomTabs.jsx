import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
// import HomeRoutes from './HomeRoutes';
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/Profile';
import CategoryRoutes from './CategoryRoutes';
import Tasks from '../screens/Tasks';
import Home from '../screens/Home';
import {TextStyles} from '../styles/TextStyle';
import {
  primaryColor,
  secondaryColor,
  secondaryColorDark,
} from '../data/constants';
import Wishlist from '../screens/WishlistScreen';
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          var iconName = 'rocket';

          if (route.name === 'HomeRoute') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'heart-sharp' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Tasks') {
            iconName = focused ? 'checkmark-done' : 'checkmark';
          }
          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              size={25}
              color={focused ? secondaryColor : secondaryColorDark}
            />
          );
        },
        tabBarActiveTintColor: secondaryColor,
        tabBarInactiveTintColor: secondaryColorDark,
      })}>
      <Tab.Screen
        name="HomeRoute"
        component={Home}
        options={{
          tabBarLabelStyle: {
            fontFamily: 'Prompt-Regular',
            fontSize: 15,
          },
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarLabelStyle: {
            fontFamily: 'Prompt-Regular',
            fontSize: 15,
          },
          tabBarLabel: 'Wishlist',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabelStyle: {
            fontFamily: 'Prompt-Regular',
            fontSize: 15,
          },
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
