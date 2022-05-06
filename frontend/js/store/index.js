import { composeWithDevTools } from '@redux-devtools/extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { createRootReducer } from './reducers';

export const history = createBrowserHistory();

const rootReducer = createRootReducer(history);

const enhancer = composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)));

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
