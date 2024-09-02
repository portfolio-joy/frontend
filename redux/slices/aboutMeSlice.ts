import { AboutMeType } from "@/types/AboutMeType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../rootInitialState";

const aboutMeSlice = createSlice({
    name: 'aboutMe',
    initialState: userInitialState,
    reducers: {
        saveAboutMeRequest(state, action: PayloadAction<{ data: AboutMeType, token: string, profile: File }>) {
            state.success = false;
            state.error = null;
        },
        updateAboutMeRequest(state, action: PayloadAction<{ data: AboutMeType, aboutMeId: string, token: string, profile: File }>) {
            state.success = false;
            state.error = null;
        },
        aboutMeSuccess(state, action: PayloadAction<AboutMeType>) {
            state.success = true;
            if (state.user) state.user.aboutMe = action.payload;
            state.error = null;
        },
        aboutMeFaliure(state, action: PayloadAction<string>) {
            state.success = false;
            state.error = JSON.parse(action.payload);
        }
    }
});

export const { saveAboutMeRequest, updateAboutMeRequest, aboutMeSuccess, aboutMeFaliure } = aboutMeSlice.actions;
export default aboutMeSlice.reducer;