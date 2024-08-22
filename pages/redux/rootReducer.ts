import { combineReducers } from "@reduxjs/toolkit"
import loginSlice from "./slices/loginSlice"
import registerSlice from "./slices/registerSlice"
import loadingSlice from "./slices/loadingSlice"
import fetchUserSlice from "./slices/fetchUserSlice"
import saveAboutMeSlice from "./slices/saveAboutMeSlice"
import updateAboutMeSlice, { updateAboutMe } from "./slices/updateAboutMeSlice"
import fetchPortfolioDataSlice from "./slices/fetchPortfolioDataSlice"

const rootReducer = combineReducers({
    register: registerSlice,
    login: loginSlice,
    loading: loadingSlice,
    user : fetchUserSlice,
    saveAboutMe : saveAboutMeSlice,
    updateAboutMe : updateAboutMeSlice,
    portfolio : fetchPortfolioDataSlice,
})

export default rootReducer;
