/*eslint "import/default": 0 */

import React from 'react';
import { Alert, Button, Image, Platform, Text, View } from 'react-native';
import SettingsList from 'react-native-settings-list'; // eslint-disable-line no-use-before-define
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';

import { settingsChanged, resetSettings, userLogout } from '../actions';
import styles from '../styles';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  componentWillMount() {
    this.setState({ settings: this.props.settings });
  }

  onChangeUseGoogleMap = () => {
    const newSettings = {
      ...this.state.settings,
      useGoogleMap: !this.state.settings.useGoogleMap
    };
    this.props.settingsChanged(newSettings);
    this.setState({ settings: newSettings });
  };

  onChangeUseMockData = () => {
    const newSettings = {
      ...this.state.settings,
      useMockData: !this.state.settings.useMockData
    };
    this.props.settingsChanged(newSettings);
    this.setState({ settings: newSettings });
  };

  _resetSettings = () => {
    this.props.resetSettings();
    this.setState({ settings: this.props.settings });
  };

  _doLogout = () => {
    console.log('logout from Google');
    this.props.userLogout();
    this.props.navigation.navigate('login');
  };

  render() {
    const { currentUser } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {currentUser &&
            <Card title="Current User">
              <View>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: currentUser.photoUrl }}
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
                  this.state.settings.useGoogleMap
                    ? 'Use Google Map'
                    : 'Use Apple Map'
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
                this.state.settings.useMockData
                  ? 'Use Mock Data'
                  : 'Use data from AWS API'
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

const mapStateToProps = ({ settings, auth }) => {
  return { settings, currentUser: auth.userInfo };
};

export default connect(mapStateToProps, {
  settingsChanged,
  resetSettings,
  userLogout
})(SettingsScreen);
