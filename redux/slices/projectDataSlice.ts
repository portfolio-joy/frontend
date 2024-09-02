import { ProjectDataState } from "@/states/ProjectDataState"
import { ProjectDataType } from "@/types/ProjectDataType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: ProjectDataState = {
    success: false,
    data: [],
}

const projectDataSlice = createSlice({
    name: 'projectData',
    initialState,
    reducers: {
        fetchProjectDataRequest(state, action: PayloadAction<{username?: string, projectName: string, token?: string}>) {
            state.success = false;
        },
        fetchProjectDataSuccess(state, action: PayloadAction<ProjectDataType[]>) {
            state.success = true;
            state.data = action.payload;
        },
        projectDataFaliure(state) {
            state.success = false;
            state.data = [];
        }
    }
})

export const { fetchProjectDataRequest, fetchProjectDataSuccess, projectDataFaliure } = projectDataSlice.actions;
export default projectDataSlice.reducer;