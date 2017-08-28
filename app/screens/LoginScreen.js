import React, { Component } from 'react';
import { Button, Platform, StyleSheet, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { userLoginSuccess } from '../actions';

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
      return {
        userInfo: {
          accessToken: result.accessToken,
          fullName: result.user.name,
          email: result.user.email,
          photoUrl: result.user.photoUrl
        }
      };
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  componentWillMount() {
    this.props.auth.isLoggedIn && this.props.navigation.navigate('main');
  }

  _doLogin = () => {
    this.setState({ loading: true });
    loginByGoogle().then(userInfo => {
      this.props.userLoginSuccess(userInfo);
      this.props.navigation.navigate('main');
    });
  };

  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
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

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { userLoginSuccess })(LoginScreen);
