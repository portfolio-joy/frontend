import { ProjectDataState } from "@/types/states/ProjectDataState"
import { ProjectDataType } from "@/types/ProjectDataType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EntityReorderType } from "@/types/EntityReorderType";

const initialState: ProjectDataState = {
    success: false,
    data: [],
}

const projectDataSlice = createSlice({
    name: 'projectData',
    initialState,
    reducers: {
        updateProjectDataState(state, action: PayloadAction<ProjectDataType[]>) {
            state.success = false;
            state.data = action.payload;
        },
        fetchProjectDataRequest(state, action: PayloadAction<{ username?: string, projectName: string, token: string | null }>) {
            state.success = false;
        },
        fetchProjectDataSuccess(state, action: PayloadAction<ProjectDataType[]>) {
            state.success = true;
            state.data = action.payload;
        },
        addProjectDataRequest(state, action: PayloadAction<{ data: ProjectDataType, token: string | null, image: File }>) {
            state.success = false;
        },
        addProjectDataSuccess(state, action: PayloadAction<ProjectDataType>) {
            state.success = true;
            state.data.push(action.payload);
        },
        updateProjectDataRequest(state, action: PayloadAction<{ data: ProjectDataType, projectDataId: string, token: string | null, image: File }>) {
            state.success = false;
        },
        updateProjectDataSuccess(state, action: PayloadAction<ProjectDataType>) {
            state.success = true;
            const projectDataIndex = state.data.findIndex((projectData) => projectData.id === action.payload.id);
            state.data![projectDataIndex] = action.payload;
        },
        removeProjectDataRequest(state, action: PayloadAction<{ projectDataId: string, token: string | null }>) {
            state.success = false;
        },
        reorderProjectDataRequest(state, action: PayloadAction<{data : EntityReorderType, token : string}>) {
            state.success = false;
        },
        reorderProjectDataSuccess(state) {
            state.success = true;
        },
        removeProjectDataSuccess(state, action: PayloadAction<{ id: string }>) {
            state.success = true;
            const projectDataIndex = state.data.findIndex((projectData) => projectData.id === action.payload.id);
            state.data.splice(projectDataIndex, 1);
        },
        projectDataFaliure(state) {
            state.success = false;
        }
    }
})

export const { updateProjectDataState, fetchProjectDataRequest, fetchProjectDataSuccess, addProjectDataRequest, addProjectDataSuccess, updateProjectDataRequest, updateProjectDataSuccess, reorderProjectDataRequest, reorderProjectDataSuccess, removeProjectDataRequest, removeProjectDataSuccess, projectDataFaliure } = projectDataSlice.actions;
export default projectDataSlice.reducer;