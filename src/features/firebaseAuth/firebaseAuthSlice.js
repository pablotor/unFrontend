import { createSlice } from '@reduxjs/toolkit';

export const firebaseAuthSlice = createSlice({
  name: 'firebaseAuth',
  initialState : {
    signup: false,
    logged: false,
    user: null,
    pending: false,
    error: null
},
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    loginRequest: state => {
      state.pending = true;
      state.error = null;
    },
    logoutRequest: state => {
      state.pending = true;
      state.error = null;
      state.user = null;
      state.logged = false;
    },
    signupRequest: state => {
      state.pending = true;
      state.error = null;
    },
    requestSuccessful: (state, action) => {
      state.pending = false;
      state.user = action.payload;
      state.logged = action.payload !== null;
      state.signup = false;
    },
    requestFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    signupSwitch: state => {
      state.signup = !state.signup;
      state.error = null;
    }
  }
});

export const { loginRequest,
               logoutRequest,
               signupRequest,
               requestSuccessful,
               requestFailed,
               signupSwitch
             } = firebaseAuthSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLogged = state => state.firebaseAuth.logged;
export const selectUser = state => state.firebaseAuth.user;
export const selectSignup = state => state.firebaseAuth.signup;
export const selectError = state => state.firebaseAuth.error;

export default firebaseAuthSlice.reducer;
