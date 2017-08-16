import React from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
import SettingsList from 'react-native-settings-list';
import { Ionicons } from '@expo/vector-icons';
import { settings, saveSettings, resetSettings } from '../utils/localStore';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  componentWillMount() {
    this.setState({ settings });
  }

  onChangeUseGoogleMap = () => {
    settings.useGoogleMap = !settings.useGoogleMap;
    this.setState({ settings });
    saveSettings();
  };

  onChangeUseMockData = () => {
    settings.useMockData = !settings.useMockData;
    this.setState({ settings });
    saveSettings();
  };

  _resetSettings = () => {
    resetSettings().then(() => {
      this.setState({ settings });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
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
    backgroundColor: '#efeff4'
  }
});
