import { SkillsType } from "@/types/SkillsType";
import { UserResponseType } from "@/types/UserResponseType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../rootInitialState";
import { SkillState } from "@/states/SkillState";

const initialState: SkillState = {
    success: false,
    data: []
}

const skillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
        updateSkillState(state, action: PayloadAction<SkillsType[]>) {
            state.success = false;
            state.data = action.payload;
        },
        addSkillRequest(state, action: PayloadAction<{ data: SkillsType, token: string }>) {
            state.success = false;
        },
        addSkillSuccess(state, action: PayloadAction<SkillsType>) {
            state.success = true;
            state.data.push(action.payload);
        },
        updateSkillRequest(state, action: PayloadAction<{ data: SkillsType, skillId: string, token: string }>) {
            state.success = false;
        },
        updateSkillSuccess(state, action: PayloadAction<SkillsType>) {
            state.success = true;
            const skillIndex = state.data.findIndex((skill) => skill.id === action.payload.id);
            state.data[skillIndex] = action.payload;
        },
        removeSkillRequest(state, action: PayloadAction<{ skillId: string, token: string }>) {
            state.success = false;
        },
        removeSkillSuccess(state, action: PayloadAction<{ id: string }>) {
            state.success = true;
                const skillIndex = state.data.findIndex((skill) => skill.id === action.payload.id);
                state.data.splice(skillIndex, 1);
        },
        skillFaliure(state) {
            state.success = false;
        }
    }
})

export const { updateSkillState, addSkillRequest, addSkillSuccess, updateSkillRequest, updateSkillSuccess, removeSkillRequest, removeSkillSuccess, skillFaliure } = skillSlice.actions;
export default skillSlice.reducer;