import { takeEvery } from 'redux-saga/effects';
import registerUserSaga from './sagas/registerUserSaga';
import loginUserSaga from './sagas/loginUserSaga';
import fetchUserSaga from './sagas/fetchUserSaga';
import saveAboutMeSaga from './sagas/saveAboutMeSaga';
import updateAboutMeSaga from './sagas/updateAboutMeSaga';
import addSkillSaga from './sagas/addSkillSaga';
import updateSkillSaga from './sagas/updateSkillSaga';
import removeSkillSaga from './sagas/removeSkillSaga';
import addProjectSaga from './sagas/addProjectSaga';
import updateProjectSaga from './sagas/updateProjectSaga';
import removeProjectSaga from './sagas/removeProjectSaga';
import fetchProjectDataSaga from './sagas/fetchProjectDataSaga';
import logoutUserSaga from './sagas/logoutUserSaga';
import addProjectDataSaga from './sagas/addProjectDataSaga';
import updateProjectDataSaga from './sagas/updateProjectDataSaga';
import removeProjectDataSaga from './sagas/removeProjectDataSaga';
import saveContactSaga from './sagas/saveContactSaga';
import updateContactSaga from './sagas/updateContactSaga';
import addSocialMediaSaga from './sagas/addSocialMediaSaga';
import { updateSocialMediaRequest } from './slices/socialMediaSlice';
import updateSocialMediaSaga from './sagas/updateSocialMediaSaga';
import removeSocialMediaSaga from './sagas/removeSocialMediaSaga';
import addTestimonialSaga from './sagas/addTestimonialSaga';
import updateTestimonialSaga from './sagas/updateTestimonialSaga';
import removeTestimonialSaga from './sagas/removeTestimonialSaga';


function* rootSaga() {
    yield takeEvery('register/registerUserRequest', registerUserSaga);
    yield takeEvery('auth/loginUserRequest', loginUserSaga);
    yield takeEvery('auth/logoutUserRequest',logoutUserSaga)
    yield takeEvery('user/fetchUserData', fetchUserSaga);
    yield takeEvery('aboutMe/saveAboutMeRequest', saveAboutMeSaga);
    yield takeEvery('aboutMe/updateAboutMeRequest', updateAboutMeSaga);
    yield takeEvery('skill/addSkillRequest',addSkillSaga);
    yield takeEvery('skill/updateSkillRequest',updateSkillSaga);
    yield takeEvery('skill/removeSkillRequest',removeSkillSaga);
    yield takeEvery('project/addProjectRequest',addProjectSaga);
    yield takeEvery('project/updateProjectRequest',updateProjectSaga);
    yield takeEvery('project/removeProjectRequest',removeProjectSaga);
    yield takeEvery('projectData/fetchProjectDataRequest',fetchProjectDataSaga);
    yield takeEvery('projectData/addProjectDataRequest',addProjectDataSaga);
    yield takeEvery('projectData/updateProjectDataRequest',updateProjectDataSaga);
    yield takeEvery('projectData/removeProjectDataRequest',removeProjectDataSaga);
    yield takeEvery('testimonial/addTestimonialRequest',addTestimonialSaga);
    yield takeEvery('testimonial/updateTestimonialRequest',updateTestimonialSaga);
    yield takeEvery('testimonial/removeTestimonialRequest',removeTestimonialSaga);
    yield takeEvery('contact/saveContactRequest', saveContactSaga);
    yield takeEvery('contact/updateContactRequest', updateContactSaga);
    yield takeEvery('socialMedia/addSocialMediaRequest',addSocialMediaSaga);
    yield takeEvery('socialMedia/updateSocialMediaRequest',updateSocialMediaSaga);
    yield takeEvery('socialMedia/removeSocialMediaRequest',removeSocialMediaSaga);
}

export default rootSaga;