import { SETTINGS_CHANGED, SETTINGS_RESET } from './types';

export const settingsChanged = settings => {
  return {
    type: SETTINGS_CHANGED,
    payload: { ...settings }
  };
};

export const resetSettings = () => {
  return {
    type: SETTINGS_RESET,
    payload: {}
  };
};
