import { LoginResponseData } from "@/types/LoginResponseData";
import { UserResponseType } from "@/types/UserResponseType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../rootInitialState";

const fetchUserSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        updateUserData(state,action: PayloadAction<UserResponseType | null>) {
            state.user = action.payload;
        },
        fetchUserData(state, action: PayloadAction<LoginResponseData>) {
            state.success = false;
        },
        fetchUserSuccess(state, action: PayloadAction<UserResponseType>) {
            state.success = true;
            state.user = action.payload;
        },
        fetchUserFailure(state) {
            state.success = false;
            state.user = null;
        },
        fetchPortfolioData(state, action: PayloadAction<string>) {
            state.success = false;
        },
        fetchPortfolioDataSuccess(state, action: PayloadAction<UserResponseType>) {
            state.success = true;
            state.user = action.payload;
        },
        fetchPortfolioDataFailure(state) {
            state.success = false;
            state.user = null;
        }
    }
});

export const { updateUserData, fetchUserData, fetchUserSuccess, fetchUserFailure, fetchPortfolioData, fetchPortfolioDataSuccess, fetchPortfolioDataFailure } = fetchUserSlice.actions;
export default fetchUserSlice.reducer;