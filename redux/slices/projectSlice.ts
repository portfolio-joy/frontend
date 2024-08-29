import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../rootInitialState";
import { UserResponseType } from "@/types/UserResponseType";
import { ProjectsType } from "@/types/ProjectsType";

const projectSlice = createSlice({
    name: 'project',
    initialState: userInitialState,
    reducers: {
        updateProjectState(state, action: PayloadAction<UserResponseType | null>) {
            state.success = false;
            state.user = action.payload;
            state.error = null;
        },
        addProjectRequest(state, action: PayloadAction<{ data: ProjectsType, token: string, image: File }>) {
            state.success = false;
            state.error = null;
        },
        addProjectSuccess(state, action: PayloadAction<ProjectsType>) {
            state.success = true;
            if (state.user) {
                state.user.projects.push(action.payload);
            };
            state.error = null;
        },
        updateProjectRequest(state, action: PayloadAction<{data: ProjectsType, projectId: string, token: string, image: File}>) {
            state.success = false;
            state.error = null;
        },
        updateProjectSuccess(state, action: PayloadAction<ProjectsType>) {
            state.success = true;
            if (state.user) {
                const skillIndex = state.user.projects.findIndex((project) => project.id === action.payload.id);
                state.user.projects[skillIndex] = action.payload;
            }
            state.error = null;
        },
        removeProjectRequest(state, action: PayloadAction<{projectId: string, token: string}>) {
            state.success = false;
            state.error = null;
        },
        removeProjectSuccess(state, action: PayloadAction<string>) {
            state.success = true;
            if(state.user) {
                const projectIndex = state.user.projects.findIndex((project) => project.id === action.payload);
                state.user.projects.splice(projectIndex, 1);
            };
            state.error = null;
        },
        projectFaliure(state, action: PayloadAction<string>) {
            state.success = false;
            state.error = action.payload;
        }
    }
})

export const { updateProjectState, addProjectRequest, addProjectSuccess, updateProjectRequest, updateProjectSuccess, removeProjectRequest, removeProjectSuccess, projectFaliure} = projectSlice.actions;
export default projectSlice.reducer;