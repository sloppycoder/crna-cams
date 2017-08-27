import React from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';

import { getAccountList } from '../api/account';

_defaultMapRegion = () => {
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE = 3.1158;
  const LONGITUDE = 101.6417;
  const LATITUDE_DELTA = 0.2;
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

class AccountListMapViewScreen extends React.Component {
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

  componentWillMount() {
    this.setState({ loading: true });

    const { settings } = this.props;
    const baseUrl = settings.useMockData ? null : settings.apiUrl;
    getAccountList(baseUrl).then(value =>
      this.setState({
        loading: false,
        accountList: value,
        mapRegion: _defaultMapRegion()
      })
    );
  }

  _getAccountDetailById = id => {
    return this.state.accountList.find(item => item.id === id);
  };

  render() {
    return this.state.loading
      ? <ActivityIndicator size="large" />
      : <View style={styles.container}>
          <MapView
            style={{ alignSelf: 'stretch', height: 600 }}
            provider={
              this.props.settings.useGoogleMap
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
        </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

const mapStateToProps = ({ settings }) => {
  return { settings };
};

export default connect(mapStateToProps)(AccountListMapViewScreen);
