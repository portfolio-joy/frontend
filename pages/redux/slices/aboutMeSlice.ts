import { AboutMeType } from "@/types/AboutMeType";
import { UserPortfolioState } from "@/types/UserPortfolioState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserPortfolioState = {
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