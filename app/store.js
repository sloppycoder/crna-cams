import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { autoRehydrate, persistStore } from 'redux-persist';

import reducers from './reducers';

const middlewares = [thunk];
const enhancer = composeWithDevTools(
  applyMiddleware(...middlewares),
  autoRehydrate({ log: false })
);

const store = createStore(reducers, {}, enhancer);
persistStore(store, { storage: AsyncStorage });

export default store;
