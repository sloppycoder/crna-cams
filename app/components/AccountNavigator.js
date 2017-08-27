import React from 'react';
import { StackNavigator } from 'react-navigation';

import AccountListScreen from '../screens/AccountListScreen';
import AccountListMapViewScreen from '../screens/AccountListMapViewScreen';
import AccountDetailScreen from '../screens/AccountDetailScreen';
import { screenChange } from '../utils/analytics';

const AccountStackNavigator = StackNavigator(
  {
    accountList: { screen: AccountListScreen },
    accountListMap: { screen: AccountListMapViewScreen },
    accountDetail: { screen: AccountDetailScreen }
  },
  {
    mode: 'modal',
    initialRouteName: 'accountList'
  }
);

export default class AccountNavigator extends React.Component {
  render() {
    return <AccountStackNavigator onNavigationStateChange={screenChange} />;
  }
}
