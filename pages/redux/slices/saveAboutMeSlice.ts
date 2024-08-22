import { AboutMeType } from "@/types/AboutMeType";
import { UserPortfolioState } from "@/types/UserPortfolioState";
import { UserResponseType } from "@/types/UserResponseType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserPortfolioState = {
    success: false,
    user: null,
    error: null
};

const saveAboutMe = {
    request: 'aboutMe/saveAboutMeRequest',
    success: 'aboutMe/saveAboutMeSuccess',
    failure: 'aboutMe/saveAboutMeFailure',
};

const saveAboutMeSlice = createSlice({
    name: 'aboutMe',
    initialState,
    reducers: {
        updateUserData(state, action: PayloadAction<UserResponseType>) {
            state.user = action.payload;
        },
        saveAboutMeRequest(state, action: PayloadAction<{ data: AboutMeType, userId: string, token : string, profile : File }>) {
            state.success = false;
            state.error = null;
        },
        saveAboutMeSuccess(state, action: PayloadAction<AboutMeType>) {
            state.success = true;
            if(state.user) state.user.aboutMe = action.payload;
            state.error = null;
        },
        saveAboutMeFaliure(state,action : PayloadAction<string>) {
            state.success = false;
            state.error = action.payload;
        }
    }
})

export const { updateUserData, saveAboutMeRequest, saveAboutMeSuccess, saveAboutMeFaliure } = saveAboutMeSlice.actions;
export default saveAboutMeSlice.reducer;
export { saveAboutMe }