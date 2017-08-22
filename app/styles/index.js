import { Platform, StatusBar, StyleSheet } from 'react-native';

const defaultMarginTop =
  Platform.OS === 'android' ? StatusBar.currentHeight : 20;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: '#efeff4',
    marginTop: defaultMarginTop
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    marginTop: defaultMarginTop
  },
  buttonStyle: {
    backgroundColor: '#00a546',
    marginTop: 100,
    marginBottom: 100
  },
  buttonTextStyle: {
    color: 'white'
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
});
