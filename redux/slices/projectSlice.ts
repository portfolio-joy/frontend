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
        },
        addProjectRequest(state, action: PayloadAction<{ data: ProjectsType, token: string, image: File }>) {
            state.success = false;
        },
        addProjectSuccess(state, action: PayloadAction<ProjectsType>) {
            state.success = true;
            if (state.user) {
                state.user.projects.push(action.payload);
            };
        },
        updateProjectRequest(state, action: PayloadAction<{data: ProjectsType, projectId: string, token: string, image: File}>) {
            state.success = false;
        },
        updateProjectSuccess(state, action: PayloadAction<ProjectsType>) {
            state.success = true;
            if (state.user) {
                const skillIndex = state.user.projects.findIndex((project) => project.id === action.payload.id);
                state.user.projects[skillIndex] = action.payload;
            }
        },
        removeProjectRequest(state, action: PayloadAction<{projectId: string, token: string}>) {
            state.success = false;
        },
        removeProjectSuccess(state, action: PayloadAction<{id: string}>) {
            state.success = true;
            if(state.user) {
                const projectIndex = state.user.projects.findIndex((project) => project.id === action.payload.id);
                state.user.projects.splice(projectIndex, 1);
            };
            console.log(state.user);
        },
        projectFaliure(state) {
            state.success = false;
        }
    }
})

export const { updateProjectState, addProjectRequest, addProjectSuccess, updateProjectRequest, updateProjectSuccess, removeProjectRequest, removeProjectSuccess, projectFaliure} = projectSlice.actions;
export default projectSlice.reducer;