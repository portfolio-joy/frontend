import { takeEvery, takeLatest } from 'redux-saga/effects';
import { registerUser } from "./slices/registerSlice"
import registerUserSaga from './sagas/registerUserSaga';
import { loginUser } from './slices/loginSlice';
import loginUserSaga from './sagas/loginUserSaga';
import { user } from './slices/fetchUserSlice';
import fetchUserSaga from './sagas/fetchUserSaga';


function* rootSaga() {
    yield takeEvery(registerUser.request, registerUserSaga);
    yield takeEvery(loginUser.request, loginUserSaga);
    yield takeEvery(user.request, fetchUserSaga);
}

export default rootSaga;