import { AboutMeState } from "@/types/AboutMeState";
import { AboutMeType } from "@/types/AboutMeType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AboutMeState = {
    success: false,
    data: null,
    error: null
};

const aboutMeSlice = createSlice({
    name : 'aboutMe',
    initialState,
    reducers : {
        updateAboutMeData(state,action : PayloadAction<AboutMeType>) {
            state.success = true;
            state.data = action.payload;
            state.error = null;
        }
    }
})

export const { updateAboutMeData } = aboutMeSlice.actions;
export default aboutMeSlice.reducer;