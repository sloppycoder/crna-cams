import React from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import { Constants, MapView } from 'expo';

_defaultMapRegion = () => {
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE = 37.78825;
  const LONGITUDE = -122.4324;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  return {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  };
};

_getMarkersFromAccountList = accountList =>
  accountList.map(e => {
    return {
      title: e.name,
      id: e.id,
      latlng: e.coord
    };
  });

export default class AccountListMapViewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Accounts Map',
      headerRight: (
        <Button
          title="List"
          onPress={() => {
            navigation.goBack(null);
          }}
        />
      )
    };
  };

  state = {
    accountList: require('../api/mock/account-list.json'),
    mapRegion: _defaultMapRegion()
  };

  _showAccountDetail = accountId => {
    console.log('navigating to ', accountId);
    //this.props.navigation.navigate('accountDetail', { account: item });
  };

  _getAccountDetailById = id => {
    return this.state.accountList.find(item => item.id === id);
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: 600 }}
          provider={
            Constants.isDevice
              ? MapView.PROVIDER_GOOGLE
              : MapView.PROVIDER_DEFAULT
          }
          region={this.state.mapRegion}
        >
          {_getMarkersFromAccountList(this.state.accountList).map(marker =>
            <MapView.Marker
              coordinate={marker.latlng}
              key={marker.id}
              title={marker.title}
              onCalloutPress={() => {
                this.props.navigation.navigate('accountDetail', {
                  account: this._getAccountDetailById(marker.id)
                });
              }}
            />
          )}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
