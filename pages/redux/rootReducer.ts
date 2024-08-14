import { combineReducers } from "@reduxjs/toolkit"
import loginSlice from "./slices/loginSlice"
import registerSlice from "./slices/registerSlice"
import loadingSlice from "./slices/loadingSlice"

const rootReducer = combineReducers({
    register: registerSlice,
    login: loginSlice,
    loading: loadingSlice
})

export default rootReducer;
