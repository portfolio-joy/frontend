import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../rootInitialState";
import { UserResponseType } from "@/types/UserResponseType";
import { ProjectsType } from "@/types/ProjectsType";
import { ProjectState } from "@/states/ProjectState";

const initialState: ProjectState = {
    success: false,
    data: []
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        updateProjectState(state, action: PayloadAction<ProjectsType[]>) {
            state.success = false;
            state.data = action.payload;
        },
        addProjectRequest(state, action: PayloadAction<{ data: ProjectsType, token: string, image: File }>) {
            state.success = false;
        },
        addProjectSuccess(state, action: PayloadAction<ProjectsType>) {
            state.success = true;
            state.data.push(action.payload);
        },
        updateProjectRequest(state, action: PayloadAction<{ data: ProjectsType, projectId: string, token: string, image: File }>) {
            state.success = false;
        },
        updateProjectSuccess(state, action: PayloadAction<ProjectsType>) {
            state.success = true;
            const skillIndex = state.data.findIndex((project) => project.id === action.payload.id);
            state.data[skillIndex] = action.payload;
        },
        removeProjectRequest(state, action: PayloadAction<{ projectId: string, token: string }>) {
            state.success = false;
        },
        removeProjectSuccess(state, action: PayloadAction<{ id: string }>) {
            state.success = true;
            const projectIndex = state.data.findIndex((project) => project.id === action.payload.id);
            state.data.splice(projectIndex, 1);
        },
        projectFaliure(state) {
            state.success = false;
        }
    }
})

export const { updateProjectState, addProjectRequest, addProjectSuccess, updateProjectRequest, updateProjectSuccess, removeProjectRequest, removeProjectSuccess, projectFaliure } = projectSlice.actions;
export default projectSlice.reducer;