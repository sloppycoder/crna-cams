import { settings } from '../utils/localStore';

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

function trackScreen(screenName) {
  // insert mobile analytics tracker here
  let info = screenName;
  switch (screenName) {
    case 'accountListMap':
      info = info + settings.useGoogleMap ? '/Google Map' : '/Apple Map';
      break;
    case 'accountDetail':
      info = info + '/id=?';
      break;
  }
  console.log('tracking screen ' + info);
}

export { getCurrentRouteName, trackScreen };
