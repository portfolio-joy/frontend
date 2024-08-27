import { LoginResponseData } from "@/types/LoginResponseData";
import { UserResponseType } from "@/types/UserResponseType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../rootInitialState";
import { updateSkillState } from "./skillSlice";

const fetchUserSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        updateUserData(state,action: PayloadAction<UserResponseType | null>) {
            state.user = action.payload;
            state.error = null;
        },
        fetchUserData(state, action: PayloadAction<LoginResponseData>) {
            state.success = false;
            state.error = null;
        },
        fetchUserSuccess(state, action: PayloadAction<UserResponseType>) {
            state.success = true;
            state.user = action.payload;
            state.error = null;
        },
        fetchUserFailure(state, action: PayloadAction<string>) {
            state.success = false;
            state.user = null;
            state.error = action.payload;
        },
        fetchPortfolioData(state, action: PayloadAction<string>) {
            state.success = false;
            state.error = null;
        },
        fetchPortfolioDataSuccess(state, action: PayloadAction<UserResponseType>) {
            state.success = true;
            state.user = action.payload;
            state.error = null;
        },
        fetchPortfolioDataFailure(state, action: PayloadAction<string>) {
            state.success = false;
            state.user = null;
            state.error = action.payload;
        }
    }
});

export const { updateUserData, fetchUserData, fetchUserSuccess, fetchUserFailure, fetchPortfolioData, fetchPortfolioDataSuccess, fetchPortfolioDataFailure } = fetchUserSlice.actions;
export default fetchUserSlice.reducer;