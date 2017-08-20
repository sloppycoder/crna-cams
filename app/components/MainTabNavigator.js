import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import AccountNavigator from '../components/AccountNavigator';
import SettingsScreen from '../screens/SettingsScreen';

export default TabNavigator(
  {
    AccountList: {
      screen: AccountNavigator
    },
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'AccountList':
            iconName =
              Platform.OS === 'ios'
                ? `ios-home${focused ? '' : '-outline'}`
                : 'md-home';
            break;
          case 'Settings':
            iconName =
              Platform.OS === 'ios'
                ? `ios-settings${focused ? '' : '-outline'}`
                : 'md-settings';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            color={focused ? '#030303' : '#ccc'}
          />
        );
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20
      }
    },
    animationEnabled: false,
    swipeEnabled: true,
    activeTintColor: '#000000'
  }
);
