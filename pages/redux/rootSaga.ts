import { takeEvery } from 'redux-saga/effects';
import { registerUser } from "./slices/registerSlice"
import registerUserSaga from './sagas/registerUserSaga';
import { loginUser } from './slices/loginSlice';
import loginUserSaga from './sagas/loginUserSaga';
import { user } from './slices/fetchUserSlice';
import fetchUserSaga from './sagas/fetchUserSaga';
import saveAboutMeSaga from './sagas/saveAboutMeSaga';
import { saveAboutMe } from './slices/saveAboutMeSlice';
import { updateAboutMe } from './slices/updateAboutMeSlice';
import updateAboutMeSaga from './sagas/updateAboutMeSaga';
import { portfolio } from './slices/fetchPortfolioDataSlice';
import fetchPortfolioDataSaga from './sagas/fetchPortfolioDataSaga';


function* rootSaga() {
    yield takeEvery(registerUser.request, registerUserSaga);
    yield takeEvery(loginUser.request, loginUserSaga);
    yield takeEvery(user.request, fetchUserSaga);
    yield takeEvery(saveAboutMe.request, saveAboutMeSaga);
    yield takeEvery(updateAboutMe.request, updateAboutMeSaga);
    yield takeEvery(portfolio.request, fetchPortfolioDataSaga);
}

export default rootSaga;