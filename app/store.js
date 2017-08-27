import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
//import { persistStore, autoRehydrate } from 'redux-persist';

import reducers from './reducers';

const middlewares = [thunk];
const enhancer = composeWithDevTools(
  {
    // Options: https://github.com/jhen0409/react-native-debugger#options
  }
)(applyMiddleware(...middlewares));

const store = createStore(reducers, {}, enhancer);

//persistStore(store);

export default store;
