import { LoginResponseData } from "@/types/LoginResponseData";
import { UserResponseType } from "@/types/UserResponseType";
import { UserState } from "@/types/UserState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
    success: false,
    data: null,
    error: null
};

const user = {
    request: 'user/fetchUserData',
    success: 'user/fetchUserSuccess',
    failure: 'user/fetchUserFailure',
}

const fetchUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserData(state,action : PayloadAction<LoginResponseData>) {
            state.success = false;
            state.error = null;
        },
        fetchUserSuccess(state, action: PayloadAction<UserResponseType>) {
            state.success = true;
            state.data = action.payload;
            state.error = null;
        },
        fetchUserFailure(state, action: PayloadAction<string>) {
            state.success = false;
            state.data = null;
            state.error = action.payload;
        }
    }
});

export const { fetchUserData, fetchUserSuccess, fetchUserFailure } = fetchUserSlice.actions;
export default fetchUserSlice.reducer;
export { user }

