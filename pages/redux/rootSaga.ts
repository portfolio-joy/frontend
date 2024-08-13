import { takeEvery } from 'redux-saga/effects';
import { registerUser } from "./slices/registerSlice"
import registerUserSaga from './sagas/registerUserSaga';
import { loginUser } from './slices/loginSlice';
import loginUserSaga from './sagas/loginUserSaga';


function* rootSaga() {
    yield takeEvery(registerUser.request, registerUserSaga);
    yield takeEvery(loginUser.request, loginUserSaga);
}

export default rootSaga;