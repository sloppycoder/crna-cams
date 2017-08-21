import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import { getCurrentRouteName, trackScreen } from '../utils/analytics';
import { currentUser } from '../utils/localStore';

const screenChange = (prevState, currentState) => {
  const currentScreen = getCurrentRouteName(currentState);
  const prevScreen = getCurrentRouteName(prevState);
  if (prevScreen !== currentScreen) {
    trackScreen(currentScreen);
  }
};

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
    initialRouteName: currentUser ? 'main' : 'login'
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
