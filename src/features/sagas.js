import { call, put, takeEvery } from 'redux-saga/effects'
import * as firebase from "firebase/app";
import app from "../firebaseConfig";
import {
  fetchPosts,
  fetchPostsError,
  fetchPostsSuccess
} from './postlister/postlisterSlice';
import {
  loginRequest,
  logoutRequest,
  signupRequest,
  requestSuccessful,
  requestFailed
} from './firebaseAuth/firebaseAuthSlice';

// Our worker Saga: will perform the async fetching task

function* fetchPostsAsync(action) {
  try {
    const data = yield call (fetch, action.payload);
    const parsedData = yield data.json();
    yield put (fetchPostsSuccess(parsedData));
  }
  catch (error) {
    yield put (fetchPostsError(error.name +': ' + error.message));
  }
};

function* peformRequestAsync(action) {
  const reqType = action.type;
  let authResult;
  let error;
  if (reqType === loginRequest().type){
    const { username, password } = action.payload;
    yield app
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then(result => {
            authResult = result;
        })
        .catch(err => {
            error = err;
        });
  } else if (reqType === signupRequest().type) {
    const { username, password } = action.payload;
    yield app
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then(result => {
            authResult = result;
        })
        .catch(err => {
            error = err;
        });
  } else if (reqType === logoutRequest().type) {
    yield app
        .auth()
        .signOut()
        .then(result => {
            authResult = result;
        })
        .catch(err => {
            error = err;
        });
  }
  if (error) {
    yield put (requestFailed(error.name +': ' + error.message));
  } else if (authResult) {
    yield put (requestSuccessful(authResult.user));
  } else {
    yield put (requestSuccessful(null));
  }
}

// Our watcher Saga: spawn a new fetchPostsAsync task on each postlister/fetchPosts
export default function* rootSaga() {
  yield takeEvery(fetchPosts().type, fetchPostsAsync)
  yield takeEvery(loginRequest().type, peformRequestAsync)
  yield takeEvery(signupRequest().type, peformRequestAsync)
  yield takeEvery(logoutRequest().type, peformRequestAsync)
}
