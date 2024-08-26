import { combineReducers } from "@reduxjs/toolkit"
import loginSlice from "./slices/loginSlice"
import registerSlice from "./slices/registerSlice"
import loadingSlice from "./slices/loadingSlice"
import fetchUserSlice from "./slices/fetchUserSlice"
import aboutMeSlice from "./slices/aboutMeSlice"
import saveSkillSlice from "./slices/skillSlice"

const rootReducer = combineReducers({
    register: registerSlice,
    login: loginSlice,
    loading: loadingSlice,
    user : fetchUserSlice,
    aboutMe : aboutMeSlice,
    saveSkill : saveSkillSlice,
})

export default rootReducer;
