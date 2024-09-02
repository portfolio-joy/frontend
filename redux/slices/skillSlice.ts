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
        },
        addSkillRequest(state, action: PayloadAction<{ data: SkillsType, token: string }>) {
            state.success = false;
        },
        addSkillSuccess(state, action: PayloadAction<SkillsType>) {
            state.success = true;
            if (state.user) {
                state.user.skills.push(action.payload);
            };
        },
        updateSkillRequest(state, action: PayloadAction<{ data: SkillsType, skillId: string, token: string }>) {
            state.success = false;
        },
        updateSkillSuccess(state, action: PayloadAction<SkillsType>) {
            state.success = true;
            if (state.user) {
                const skillIndex = state.user.skills.findIndex((skill) => skill.id === action.payload.id);
                state.user.skills[skillIndex] = action.payload;
            }
        },
        removeSkillRequest(state, action: PayloadAction<{ skillId: string, token: string }>) {
            state.success = false;
        },
        removeSkillSuccess(state, action: PayloadAction<{id: string}>) {
            state.success = true;
            if (state.user) {
                const skillIndex = state.user.skills.findIndex((skill) => skill.id === action.payload.id);
                state.user.skills.splice(skillIndex, 1);
            }
        },
        skillFaliure(state) {
            state.success = false;
        }
    }
})

export const { updateSkillState, addSkillRequest, addSkillSuccess, updateSkillRequest, updateSkillSuccess, removeSkillRequest, removeSkillSuccess, skillFaliure } = skillSlice.actions;
export default skillSlice.reducer;