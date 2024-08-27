import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUserPayload } from "@/types/LoginUserPayload";
import { LoginResponseData } from "@/types/LoginResponseData";
import { LoginUserState } from "@/types/LoginUserState";

const initialState: LoginUserState = {
    success: false,
    data: null,
    error: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginUserRequest(state,action : PayloadAction<LoginUserPayload>) {
            state.success = false;
            state.error = null;
        },
        loginUserSuccess(state, action : PayloadAction<LoginResponseData>){
            state.success = true;
            state.data = action.payload;
            state.error = null;
        },
        loginUserFailure(state, action: PayloadAction<string>) {
            state.success = false;
            state.data = null;
            state.error = action.payload;
        },
    },
});

export const { loginUserRequest, loginUserSuccess, loginUserFailure } = loginSlice.actions;
export default loginSlice.reducer;