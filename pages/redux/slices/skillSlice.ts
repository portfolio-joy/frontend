import { SkillsType } from "@/types/SkillsType";
import { UserPortfolioState } from "@/types/UserPortfolioState";
import { UserResponseType } from "@/types/UserResponseType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserPortfolioState = {
    success: false,
    user: null,
    error: null
};

const skillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
        updateSkillState(state,action: PayloadAction<UserResponseType | null>) {
            state.user = action.payload;
            state.error = null;
        },
        saveSkillRequest(state, action: PayloadAction<{ data: SkillsType, userId: string, token: string }>) {
            state.success = false;
            state.error = null;
        },
        saveSkillSuccess(state, action: PayloadAction<SkillsType>) {
            state.success = true;
            if (state.user) {
                state.user.skills.push(action.payload)
            };
            state.error = null;
        },
        saveSkillFaliure(state, action: PayloadAction<string>) {
            state.success = false;
            state.error = action.payload;
        },
        updateSkillRequest(state, action: PayloadAction<{ data: SkillsType, skillId: string, userId: string, token: string }>) {
            state.success = false;
            state.error = null;
        },
        updateSkillSuccess(state, action: PayloadAction<SkillsType>) {
            state.success = true;
            if (state.user) {
                const skillIndex = state.user.skills.findIndex((skill) => skill.id === action.payload.id);
                state.user.skills[skillIndex] = action.payload;
            }
            state.error = null;
        },
        updateSkillFaliure(state, action: PayloadAction<string>) {
            state.success = false;
            state.error = action.payload;
        },
        removeSkillRequest(state, action: PayloadAction<{ skillId: string, token: string }>) {
            state.success = false;
            state.error = null;
        },
        removeSkillSuccess(state, action: PayloadAction<string>) {
            state.success = true;
            if (state.user) {
                const skillIndex = state.user.skills.findIndex((skill) => skill.id === action.payload);
                state.user.skills.splice(skillIndex, 1);
            }
            state.error = null;
        },
        removeSkillFaliure(state, action: PayloadAction<string>) {
            state.success = false;
            state.error = action.payload;
        }
    }
})

export const { updateSkillState, saveSkillRequest, saveSkillSuccess, saveSkillFaliure, updateSkillRequest, updateSkillSuccess, updateSkillFaliure, removeSkillRequest, removeSkillSuccess, removeSkillFaliure } = skillSlice.actions;
export default skillSlice.reducer;