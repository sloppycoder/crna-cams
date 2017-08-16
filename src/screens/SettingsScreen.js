import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SettingsList from 'react-native-settings-list';
import { Ionicons } from '@expo/vector-icons';
import { settings, saveSettings } from '../utils/localStore';

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
