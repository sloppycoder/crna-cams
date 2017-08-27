import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import { screenChange } from '../utils/analytics';

const RootStackNavigator = StackNavigator(
  {
    main: {
      screen: MainTabNavigator
    },
    login: {
      screen: LoginScreen
    }
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'login'
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator onNavigationStateChange={screenChange} />;
  }

  _registerForPushNotifications() {
    // Watch for incoming notifications
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}
