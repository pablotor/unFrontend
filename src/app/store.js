import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'; // uncomment to use logger middleware

import postlisterReducer from '../features/postlister/postlisterSlice';
import firebaseAuthReducer from '../features/firebaseAuth/firebaseAuthSlice';
import rootSaga from '../features/sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// setup the middlewares array for configureStore
//const middlewares = [sagaMiddleware];
const middlewares = [sagaMiddleware, logger]; //test only!!!!

export default configureStore({
  reducer: {
    postlister: postlisterReducer,
    firebaseAuth: firebaseAuthReducer
  },
  middleware: middlewares
});

// then run the saga
sagaMiddleware.run(rootSaga);
