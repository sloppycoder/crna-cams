import { AsyncStorage, Platform } from 'react-native';
import { Constants } from 'expo';

DEFAULT_SETTINGS = {
  useTouchId: false,
  useGoogleMap: Constants.isDevice,
  useMockData: true,
  apiUrl: 'https://vino9.net/api/'
};

SETTINGS_KEY = 'cam-proto-settings';

let settings = DEFAULT_SETTINGS;

async function loadSettings() {
  try {
    let savedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
    if (savedSettings !== null) {
      // merge default setting with settings loaded from storage
      settings = Object.assign(settings, JSON.parse(savedSettings));
      console.log('loading settings', settings);
    }
  } catch (error) {
    consloe('error when reading settings', error);
  }
}

async function saveSettings() {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    console.log('saved settings', settings);
  } catch (error) {
    console.log('error when saving settings', error);
  }
}

export { settings, loadSettings, saveSettings };
