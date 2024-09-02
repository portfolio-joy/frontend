import { RegisterUserPayload } from '@/types/RegisterUserPayload';
import { RegisterUserState } from '@/types/RegisterUserState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RegisterUserState = {
    success: false,
    error: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerUserRequest(state,action : PayloadAction<RegisterUserPayload>) {
            state.success = false;
            state.error = null;
        },
        registerUserSuccess(state){
            state.success = true;
            state.error = null;
        },
        registerUserFailure(state, action: PayloadAction<string>) {
            state.success = false;
            state.error = JSON.parse(action.payload);
        },
    },
});

export const { registerUserRequest, registerUserSuccess, registerUserFailure } = registerSlice.actions;
export default registerSlice.reducer;