import { AdminResponseData } from "@/types/AdminResponseData";
import { AdminState } from "@/types/states/AdminState";
import { UserResponseType } from "@/types/UserResponseType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AdminState = {
    data: null,
    success: false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        fetchAllAdminData(state, action: PayloadAction<{ token: string | null }>) {
            state.success = false;
        },
        adminSuccess(state, action: PayloadAction<AdminResponseData>) {
            state.success = true;
            state.data = action.payload;
        },
        adminFaliure(state) {
            state.success = false;
            state.data = null;
        }
    }
});

export const {fetchAllAdminData, adminSuccess, adminFaliure} = adminSlice.actions;
export default adminSlice.reducer;