import { AsyncStorage, Platform } from 'react-native';
import { Constants } from 'expo';

DEFAULT_SETTINGS = {
  useTouchId: false,
  useGoogleMap: Constants.isDevice,
  useMockData: true,
  apiUrl: 'https://vino9.net/api/'
};

SETTINGS_KEY = 'cam-proto-settings';

let loadSettings = async () => {
  let s = DEFAULT_SETTINGS;
  try {
    let settings = await AsyncStorage.getItem(SETTINGS_KEY);
    if (settings !== null) {
      // merge default setting with settings loaded from storage
      s = Object.assign(JSON.parse(settings), DEFAULT_SETTINGS);
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
