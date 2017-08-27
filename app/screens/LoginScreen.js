import React, { Component } from 'react';
import { Button, Platform, StyleSheet, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { userLoginSuccess } from '../actions';

const DUMMY_USER = {
  isLoggedIn: true,
  userInfo: {
    accessToken: 'blah_token',
    fullName: 'Li Lin',
    email: 'lilin@lilin.com',
    photoUrl:
      'https://www.sc.com/en/resources/global-en/img/home/Private_Banking_169x60.jpg'
  }
};

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  _doLogin = () => {
    this.props.userLoginSuccess(DUMMY_USER);
    this.props.navigation.navigate('main');
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
