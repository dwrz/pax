import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';

const local = localStorage.getItem('isPaxLocalMode') === 'true';

const logger = createLogger();
const middleware = local ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);

const store = createStore(reducer, middleware);

store.subscribe(() => {
  if (local) {
    console.log('Store has changed: ', store.getState());
  }
});

export default store;
