import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AccountListScreen from '../screens/AccountListScreen';
import AccountListMapViewScreen from '../screens/AccountListMapViewScreen';
import AccountDetailScreen from '../screens/AccountDetailScreen';

const RootStackNavigator = StackNavigator(
  {
    main: {
      screen: MainTabNavigator,
    },
    accountList: { screen: AccountListScreen },
    accountListMap: { screen: AccountListMapViewScreen },
    accountDetail: { screen: AccountDetailScreen },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
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
    return <RootStackNavigator />;
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
