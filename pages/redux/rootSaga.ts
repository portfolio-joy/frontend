import { takeEvery, takeLatest } from 'redux-saga/effects';
import { registerUser } from "./slices/registerSlice"
import registerUserSaga from './sagas/registerUserSaga';
import { loginUser } from './slices/loginSlice';
import loginUserSaga from './sagas/loginUserSaga';
import { user } from './slices/fetchUserSlice';
import fetchUserSaga from './sagas/fetchUserSaga';
import saveAboutMeSaga from './sagas/saveAboutMeSaga';
import { aboutMe } from './slices/aboutMeSlice';


function* rootSaga() {
    yield takeEvery(registerUser.request, registerUserSaga);
    yield takeEvery(loginUser.request, loginUserSaga);
    yield takeEvery(user.request, fetchUserSaga);
    yield takeEvery(aboutMe.request, saveAboutMeSaga);
}

export default rootSaga;