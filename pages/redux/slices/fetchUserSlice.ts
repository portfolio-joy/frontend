import { LoginResponseData } from "@/types/LoginResponseData";
import { UserResponseType } from "@/types/UserResponseType";
import { UserPortfolioState } from "@/types/UserPortfolioState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserPortfolioState = {
    success: false,
    user: null,
    error: null
};

const fetchUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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

export const { fetchUserData, fetchUserSuccess, fetchUserFailure, fetchPortfolioData, fetchPortfolioDataSuccess, fetchPortfolioDataFailure } = fetchUserSlice.actions;
export default fetchUserSlice.reducer;