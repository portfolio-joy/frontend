import { AboutMeType } from "@/types/AboutMeType";
import { UserPortfolioState } from "@/types/UserPortfolioState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserPortfolioState = {
    success: false,
    user: null,
    error: null
};

const updateAboutMe = {
    request: 'aboutMe/updateAboutMeRequest',
    success: 'aboutMe/updateAboutMeSuccess',
    failure: 'aboutMe/updateAboutMeFailure',
};

const updateAboutMeSlice = createSlice({
    name: 'aboutMe',
    initialState,
    reducers: {
        updateAboutMeRequest(state, action: PayloadAction<{ data: AboutMeType, aboutMeId: string, userId: string, token : string, profile : File }>) {
            state.success = false;
            state.error = null;
        },
        updateAboutMeSuccess(state, action: PayloadAction<AboutMeType>) {
            state.success = true;
            if(state.user) state.user.aboutMe = action.payload;
            state.error = null;
        },
        updateAboutMeFaliure(state,action : PayloadAction<string>) {
            state.success = false;
            state.error = action.payload;
        }
    }
})

export const { updateAboutMeRequest, updateAboutMeSuccess, updateAboutMeFaliure } = updateAboutMeSlice.actions;
export default updateAboutMeSlice.reducer;
export { updateAboutMe }