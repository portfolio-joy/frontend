import { SkillsType } from "@/types/SkillsType";
import { UserResponseType } from "@/types/UserResponseType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../rootInitialState";

const skillSlice = createSlice({
    name: 'skill',
    initialState: userInitialState,
    reducers: {
        updateSkillState(state, action: PayloadAction<UserResponseType | null>) {
            state.success = false;
            state.user = action.payload;
            state.error = null;
        },
        addSkillRequest(state, action: PayloadAction<{ data: SkillsType, token: string }>) {
            state.success = false;
            state.error = null;
        },
        addSkillSuccess(state, action: PayloadAction<SkillsType>) {
            state.success = true;
            if (state.user) {
                state.user.skills.push(action.payload);
            };
            state.error = null;
        },
        updateSkillRequest(state, action: PayloadAction<{ data: SkillsType, skillId: string, token: string }>) {
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
        removeSkillRequest(state, action: PayloadAction<{ skillId: string, token: string }>) {
            state.success = false;
            state.error = null;
        },
        removeSkillSuccess(state, action: PayloadAction<{id: string}>) {
            state.success = true;
            if (state.user) {
                const skillIndex = state.user.skills.findIndex((skill) => skill.id === action.payload.id);
                state.user.skills.splice(skillIndex, 1);
            }
            state.error = null;
        },
        skillFaliure(state, action: PayloadAction<string>) {
            state.success = false;
            state.error = JSON.parse(action.payload);
        }
    }
})

export const { updateSkillState, addSkillRequest, addSkillSuccess, updateSkillRequest, updateSkillSuccess, removeSkillRequest, removeSkillSuccess, skillFaliure } = skillSlice.actions;
export default skillSlice.reducer;