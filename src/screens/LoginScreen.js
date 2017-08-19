import React, { Component } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  currentUser,
  loadCurrentUser,
  setCurrentUser
} from '../utils/localStore';

async function loginByGoogle() {
  try {
    const result = await Expo.Google.logInAsync({
      iosClientId:
        '391024201222-ljp9geta9e1mj4m14sg2bimh04phbn0c.apps.googleusercontent.com',
      androidClientId:
        '391024201222-8k77d0m8fb5tatknsqbgbok2esmtco9u.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    });

    if (result.type === 'success') {
      console.log('login success', result);
      setCurrentUser({
        accessToken: result.accessToken,
        fullName: result.user.name,
        email: result.user.email
      });
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  _doLogin = () => {
    this.setState({ loading: true });
    loginByGoogle().then(() => {
      this.props.navigation.navigate('main');
    });
  };

  componentWillMount() {
    this.setState({ loading: false });
    loadCurrentUser().then(() => {
      console.log(`currentUser ${currentUser}`);
      currentUser && this.props.navigation.navigate('main');
    });
  }

  render() {
    return this.state.loading
      ? <View style={styles.container}>
          <Text>Logging in...</Text>
        </View>
      : <View style={styles.container}>
          <Ionicons
            name="logo-google"
            size={64}
            color="#030303"
            style={{
              marginTop: 100,
              marginBottom: 100
            }}
          />
          <Button title="Login using Google" onPress={this._doLogin} />
        </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20
  }
});
