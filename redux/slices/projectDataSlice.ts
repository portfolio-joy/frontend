import { ProjectDataState } from "@/types/ProjectDataState"
import { ProjectDataType } from "@/types/ProjectDataType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: ProjectDataState = {
    success: false,
    data: [],
    error: null
}

const projectDataSlice = createSlice({
    name: 'projectData',
    initialState,
    reducers: {
        fetchProjectDataRequest(state, action: PayloadAction<{username?: string, projectName: string, token?: string}>) {
            state.success = false;
            state.error = null;
        },
        fetchProjectDataSuccess(state, action: PayloadAction<ProjectDataType[]>) {
            state.success = true;
            state.data = action.payload;
            state.error = null;
        },
        projectDataFaliure(state, action: PayloadAction<string>) {
            state.success = false;
            state.data = [];
            state.error = JSON.parse(action.payload);
        }
    }
})

export const { fetchProjectDataRequest, fetchProjectDataSuccess, projectDataFaliure } = projectDataSlice.actions;
export default projectDataSlice.reducer;