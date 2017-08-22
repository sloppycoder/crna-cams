import React, { Component } from 'react';
import { Button, Linking, Text, View } from 'react-native';
import { phonecall, text } from 'react-native-communications';

import styles from '../styles';

export default class AccountDetailScreen extends Component {
  static navigationOptions = {
    title: 'Account Detail'
  };

  render() {
    const { account } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text>
          {account.name}
        </Text>
        <Text>
          {account.address}
        </Text>
        <Button title="Call" onPress={() => phonecall(account.phone, false)} />
        <Button
          title="SMS"
          onPress={() => text(account.phone, 'from your bank...')}
        />
        <Button
          title="Directions"
          onPress={() => {
            console.log('driving directions for ', account.address);
            Linking.openURL(
              'https://www.google.com/maps/dir/?api=1&destination=' +
                encodeURI(account.address)
            );
          }}
        />
      </View>
    );
  }
}
