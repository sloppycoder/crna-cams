import React from 'react';
import {
  Alert,
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import { Card } from 'react-native-elements';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import {
  currentUser,
  settings,
  saveAppState,
  resetSettings,
  setCurrentUser
} from '../utils/localStore';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  componentWillMount() {
    this.setState({ settings, currentUser });
  }

  onChangeUseGoogleMap = () => {
    settings.useGoogleMap = !settings.useGoogleMap;
    this.setState({ settings });
    saveAppState();
  };

  onChangeUseMockData = () => {
    settings.useMockData = !settings.useMockData;
    this.setState({ settings });
    saveAppState();
  };

  _resetSettings = () => {
    resetSettings().then(() => {
      this.setState({ settings });
    });
  };

  _doLogout = () => {
    console.log('logout from Google');
    setCurrentUser(null).then(this.props.navigation.navigate('login'));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {this.state.currentUser &&
            <Card title="Current User">
              <View>
                <Ionicons
                  name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
                  size={64}
                  style={{ marginBottom: -3 }}
                />
                <Text>
                  {currentUser.fullName}
                </Text>
              </View>
              <Button
                backgroundColor="red"
                title="Logout"
                onPress={this._doLogout}
              />
            </Card>}
          <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
            {Platform.OS === 'ios' &&
              <SettingsList.Item
                hasSwitch={true}
                switchState={this.state.settings.useGoogleMap}
                switchOnValueChange={this.onChangeUseGoogleMap}
                hasNavArrow={false}
                title="Use Google Map"
                titleInfo={
                  settings.useGoogleMap ? 'Use Google Map' : 'Use Apple Map'
                }
              />}
            <SettingsList.Item
              title="Navigation"
              titleInfo="Google Map"
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.settings.useMockData}
              switchOnValueChange={this.onChangeUseMockData}
              hasNavArrow={false}
              title={
                settings.useMockData
                  ? 'Use Mock Data'
                  : 'Use data from ' + settings.apiUrl
              }
            />
          </SettingsList>
          <Button
            title="Reset to defaults"
            onPress={() =>
              Alert.alert('Reset Settings', 'Reset all options to default?', [
                { text: 'OK', onPress: () => this._resetSettings() },
                { text: 'Cancel', onPress: () => {} }
              ])}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeff4',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20
  }
});
