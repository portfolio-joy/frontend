import { combineReducers } from "@reduxjs/toolkit"
import loginSlice from "./slices/loginSlice"
import registerSlice from "./slices/registerSlice"
import loadingSlice from "./slices/loadingSlice"
import fetchUserSlice from "./slices/fetchUserSlice"
import aboutMeSlice from "./slices/aboutMeSlice"
import skillSlice from "./slices/skillSlice"
import projectSlice from "./slices/projectSlice"
import projectDataSlice from "./slices/projectDataSlice"

const rootReducer = combineReducers({
    register: registerSlice,
    login: loginSlice,
    loading: loadingSlice,
    user: fetchUserSlice,
    aboutMe: aboutMeSlice,
    skill: skillSlice,
    project: projectSlice,
    projectData: projectDataSlice
})

export default rootReducer;
