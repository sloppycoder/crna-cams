import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { phonecall, text } from 'react-native-communications';

export default class AccountDetailScreen extends Component {
  static navigationOptions = {
    title: 'Account Detail',
  };

  render() {
    const { account } = this.props.navigation.state.params;
    console.log('account details', account);
    return (
      <View style={styles.container}>
        <Text>
          {account.name}
        </Text>
        <Button title="Call" onPress={() => phonecall(account.phone, false)} />
        <Button
          title="SMS"
          onPress={() => text(account.phone, 'from your bank...')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
