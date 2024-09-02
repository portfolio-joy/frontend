import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUserPayload } from "@/types/LoginUserPayload";
import { LoginResponseData } from "@/types/LoginResponseData";
import { LoginUserState } from "@/states/LoginUserState";

const initialState: LoginUserState = {
    success: false,
    data: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginUserRequest(state,action : PayloadAction<LoginUserPayload>) {
            state.success = false;
        },
        loginUserSuccess(state, action : PayloadAction<LoginResponseData>){
            state.success = true;
            state.data = action.payload;
        },
        loginUserFailure(state) {
            state.success = false;
            state.data = null;
        },
    },
});

export const { loginUserRequest, loginUserSuccess, loginUserFailure } = loginSlice.actions;
export default loginSlice.reducer;