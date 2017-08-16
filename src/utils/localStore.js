import { AsyncStorage, Platform } from 'react-native';
import { Constants } from 'expo';

DEFAULT_SETTINGS = () =>
  Object.assign(
    {},
    {
      useTouchId: false,
      useGoogleMap: Constants.isDevice,
      useMockData: true,
      apiUrl: 'https://vino9.net/api/cams'
    }
  );

SETTINGS_KEY = 'cam-proto-settings';

let settings = DEFAULT_SETTINGS();

async function loadSettings() {
  try {
    let savedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
    if (savedSettings !== null) {
      // merge saved settings with default
      settings = Object.assign(settings, JSON.parse(savedSettings));
      // reset useMockData just in case a bad URL will ruin the whole thing
      settings.useMockData = true;
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

async function resetSettings() {
  settings = DEFAULT_SETTINGS();
  saveSettings();
}

export { settings, loadSettings, saveSettings, resetSettings };
