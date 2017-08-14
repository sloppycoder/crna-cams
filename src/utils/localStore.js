import { AsyncStorage, Platform } from 'react-native';
import { Constants } from 'expo';

DEFAULT_SETTINGS = {
  useGoogleMap: Constants.isDevice
};

SETTINGS_KEY = 'cam-proto-settings';

let loadSettings = async () => {
  let s = DEFAULT_SETTINGS;
  try {
    let settings = await AsyncStorage.getItem(SETTINGS_KEY);
    if (settings !== null) {
      s = JSON.parse(settings);
    }
  } catch (error) {
    consloe('got error when reading settings', error);
  }
  console.log('loading settings', s);
  return s;
};

let saveSettings = async settings => {
  console.log('saving settings', settings);
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export { loadSettings, saveSettings };
