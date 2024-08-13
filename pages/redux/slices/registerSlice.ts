import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a TypeScript interface for the user state
interface RegisterState {
    success: boolean;
    user: any; // Replace `any` with a more specific type if you have a user model
    error: string | null;
}

// Define the initial state using that type
const initialState: RegisterState = {
    success: false,
    user: null,
    error: null,
};

// Define a TypeScript interface for the registration payload
export interface RegisterUserPayload {
    firstName: string;
    lastName: string;
    emailId: string;
    username: string;
    password: string;
}

// Define action types
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
            state.user = action.payload
            state.error = null;
        },
        registerUserSuccess(state, action: PayloadAction<any>) {
            state.success = true;
            state.user = action.payload;
        },
        registerUserFailure(state, action: PayloadAction<string>) {
            state.success = false;
            state.user = null;
            state.error = action.payload;
        },

        registerUserData(state, action: PayloadAction<RegisterUserPayload>) {},
    },
});

export const { registerUserRequest, registerUserSuccess, registerUserFailure, registerUserData } = registerSlice.actions;
export default registerSlice.reducer;
export { registerUser };