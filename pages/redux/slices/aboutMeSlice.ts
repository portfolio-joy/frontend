import { AboutMeType } from "@/types/AboutMeType";
import { UserPortfolioState } from "@/types/UserPortfolioState";
import { UserResponseType } from "@/types/UserResponseType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserPortfolioState = {
    success: false,
    user: null,
    error: null
};

const aboutMeSlice = createSlice({
    name: 'aboutMe',
    initialState,
    reducers: {
        saveAboutMeRequest(state, action: PayloadAction<{ data: AboutMeType, userId: string, token: string, profile: File }>) {
            state.success = false;
            state.error = null;
        },
        saveAboutMeSuccess(state, action: PayloadAction<AboutMeType>) {
            state.success = true;
            if (state.user) state.user.aboutMe = action.payload;
            state.error = null;
        },
        saveAboutMeFaliure(state, action: PayloadAction<string>) {
            state.success = false;
            state.error = action.payload;
        },
        updateAboutMeRequest(state, action: PayloadAction<{ data: AboutMeType, aboutMeId: string, userId: string, token: string, profile: File }>) {
            state.success = false;
            state.error = null;
        },
        updateAboutMeSuccess(state, action: PayloadAction<AboutMeType>) {
            state.success = true;
            if (state.user) state.user.aboutMe = action.payload;
            state.error = null;
        },
        updateAboutMeFaliure(state, action: PayloadAction<string>) {
            state.success = false;
            state.error = action.payload;
        }
    }
})

export const { saveAboutMeRequest, saveAboutMeSuccess, saveAboutMeFaliure, updateAboutMeRequest, updateAboutMeSuccess, updateAboutMeFaliure } = aboutMeSlice.actions;
export default aboutMeSlice.reducer;