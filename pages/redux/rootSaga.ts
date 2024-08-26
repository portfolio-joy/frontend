import { takeEvery } from 'redux-saga/effects';
import { registerUser } from "./slices/registerSlice"
import registerUserSaga from './sagas/registerUserSaga';
import { loginUser } from './slices/loginSlice';
import loginUserSaga from './sagas/loginUserSaga';
import fetchUserSaga from './sagas/fetchUserSaga';
import saveAboutMeSaga from './sagas/saveAboutMeSaga';
import updateAboutMeSaga from './sagas/updateAboutMeSaga';
import fetchPortfolioDataSaga from './sagas/fetchPortfolioDataSaga';
import saveSkillSaga from './sagas/saveSkillSaga';


function* rootSaga() {
    yield takeEvery(registerUser.request, registerUserSaga);
    yield takeEvery(loginUser.request, loginUserSaga);
    yield takeEvery('user/fetchUserData', fetchUserSaga);
    yield takeEvery('aboutMe/saveAboutMeRequest', saveAboutMeSaga);
    yield takeEvery('aboutMe/updateAboutMeRequest', updateAboutMeSaga);
    yield takeEvery('user/fetchPortfolioData', fetchPortfolioDataSaga);
    yield takeEvery('skill/saveSkillRequest',saveSkillSaga);
}

export default rootSaga;