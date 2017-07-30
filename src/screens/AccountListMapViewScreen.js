import React from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import { MapView } from 'expo';

_defaultMapRegion = () => {
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE = 37.78825;
  const LONGITUDE = -122.4324;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  return {
    mapRegion: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  };
};

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

  state = _defaultMapRegion();

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: 600 }}
          region={this.state.mapRegion}
        />
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
