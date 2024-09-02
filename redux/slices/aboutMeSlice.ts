import { AboutMeType } from "@/types/AboutMeType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../rootInitialState";

const aboutMeSlice = createSlice({
    name: 'aboutMe',
    initialState: userInitialState,
    reducers: {
        saveAboutMeRequest(state, action: PayloadAction<{ data: AboutMeType, token: string, profile: File }>) {
            state.success = false;
        },
        updateAboutMeRequest(state, action: PayloadAction<{ data: AboutMeType, aboutMeId: string, token: string, profile: File }>) {
            state.success = false;
        },
        aboutMeSuccess(state, action: PayloadAction<AboutMeType>) {
            state.success = true;
            if (state.user) state.user.aboutMe = action.payload;
        },
        aboutMeFaliure(state) {
            state.success = false;
        }
    }
});

export const { saveAboutMeRequest, updateAboutMeRequest, aboutMeSuccess, aboutMeFaliure } = aboutMeSlice.actions;
export default aboutMeSlice.reducer;