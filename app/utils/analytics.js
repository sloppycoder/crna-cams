function trackScreen(screenName) {
  // place holder for mobile analytics logicinsert mobile analytics tracker here
  console.log(`tracking screen ${screenName}`);
}

// gets the current screen from navigation state (without Redux)
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

export const screenChange = (prevState, currentState) => {
  const currentScreen = getCurrentRouteName(currentState);
  const prevScreen = getCurrentRouteName(prevState);
  if (prevScreen !== currentScreen) {
    trackScreen(currentScreen);
  }
};
