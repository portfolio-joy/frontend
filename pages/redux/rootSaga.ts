import { takeEvery } from 'redux-saga/effects';
import { registerUser } from "./slices/registerSlice"
import registerUserSaga from './sagas/registerUserSaga';


function* rootSaga() {
    yield takeEvery(registerUser.request, registerUserSaga);
}

export default rootSaga;