import React from 'react';
import { Text } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import AccountListScreen from '../screens/AccountListScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default TabNavigator(
  {
    Home: {
      screen: AccountListScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        return (
          <Text>
            {routeName.concat(focused ? '*' : '')}
          </Text>
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: { showLabel: false },
    animationEnabled: false,
    swipeEnabled: false,
    mode: 'modal',
  }
);
