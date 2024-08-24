import { SkillsType } from "@/types/SkillsType";
import { UserPortfolioState } from "@/types/UserPortfolioState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserPortfolioState = {
    success: false,
    user: null,
    error: null
};

const saveSkillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
        saveSkillRequest(state, action: PayloadAction<{ data: SkillsType, userId: string, token : string}>) {
            state.success = false;
            state.error = null;
        },
        saveSkillSuccess(state, action: PayloadAction<SkillsType>) {
            state.success = true;
            if(state.user) state.user.skills.push(action.payload);
            state.error = null;
        },
        saveSkillFaliure(state,action : PayloadAction<string>) {
            state.success = false;
            state.error = action.payload;
        }
    }
})

export const { saveSkillRequest, saveSkillSuccess, saveSkillFaliure } = saveSkillSlice.actions;
export default saveSkillSlice.reducer;