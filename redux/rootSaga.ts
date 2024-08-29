import { takeEvery } from 'redux-saga/effects';
import registerUserSaga from './sagas/registerUserSaga';
import loginUserSaga from './sagas/loginUserSaga';
import fetchUserSaga from './sagas/fetchUserSaga';
import saveAboutMeSaga from './sagas/saveAboutMeSaga';
import updateAboutMeSaga from './sagas/updateAboutMeSaga';
import fetchPortfolioDataSaga from './sagas/fetchPortfolioDataSaga';
import addSkillSaga from './sagas/addSkillSaga';
import updateSkillSaga from './sagas/updateSkillSaga';
import removeSkillSaga from './sagas/removeSkillSaga';
import addProjectSaga from './sagas/addProjectSaga';
import updateProjectSaga from './sagas/updateProjectSaga';
import removeProjectSaga from './sagas/removeProjectSaga';


function* rootSaga() {
    yield takeEvery('register/registerUserRequest', registerUserSaga);
    yield takeEvery('login/loginUserRequest', loginUserSaga);
    yield takeEvery('user/fetchUserData', fetchUserSaga);
    yield takeEvery('aboutMe/saveAboutMeRequest', saveAboutMeSaga);
    yield takeEvery('aboutMe/updateAboutMeRequest', updateAboutMeSaga);
    yield takeEvery('user/fetchPortfolioData', fetchPortfolioDataSaga);
    yield takeEvery('skill/addSkillRequest',addSkillSaga);
    yield takeEvery('skill/updateSkillRequest',updateSkillSaga);
    yield takeEvery('skill/removeSkillRequest',removeSkillSaga);
    yield takeEvery('project/addProjectRequest',addProjectSaga);
    yield takeEvery('project/updateProjectRequest',updateProjectSaga);
    yield takeEvery('project/removeProjectRequest',removeProjectSaga);
}

export default rootSaga;