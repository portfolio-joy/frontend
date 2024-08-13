import { RegisterUserPayload } from '@/types/RegisterUserPayload';
import { RegisterUserState } from '@/types/RegisterUserState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RegisterUserState = {
    success: false,
    data: null,
    error: null,
};

const registerUser = {
    request: 'register/registerUserRequest',
    success: 'register/registerUserSuccess',
    failure: 'register/registerUserFailure',
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerUserRequest(state,action) {
            state.success = false;
            state.data = action.payload
            state.error = null;
        },
        registerUserSuccess(state){
            state.success = true;
            state.data = null;
            state.error = null;
        },
        registerUserFailure(state, action: PayloadAction<string>) {
            state.success = false;
            state.data = null;
            state.error = action.payload;
        },

        registerUserData(state, action: PayloadAction<RegisterUserPayload>) {},
    },
});

export const { registerUserRequest, registerUserSuccess, registerUserFailure, registerUserData } = registerSlice.actions;
export default registerSlice.reducer;
export { registerUser };