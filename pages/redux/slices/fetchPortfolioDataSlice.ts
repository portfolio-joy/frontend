import { UserResponseType } from "@/types/UserResponseType";
import { UserState } from "@/types/UserState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
    success: false,
    data: null,
    error: null
};

const portfolio = {
    request: 'portfolio/fetchPortfolioData',
    success: 'portfolio/fetchPortfolioDataSuccess',
    failure: 'portfolio/fetchPortfolioDataFailure',
}

const fetchPortfolioDataSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        fetchPortfolioData(state,action : PayloadAction<string>) {
            state.success = false;
            state.error = null;
        },
        fetchPortfolioDataSuccess(state, action: PayloadAction<UserResponseType>) {
            state.success = true;
            state.data = action.payload;
            state.error = null;
        },
        fetchPortfolioDataFailure(state, action: PayloadAction<string>) {
            state.success = false;
            state.data = null;
            state.error = action.payload;
        }
    }
});

export const { fetchPortfolioData, fetchPortfolioDataSuccess, fetchPortfolioDataFailure } = fetchPortfolioDataSlice.actions;
export default fetchPortfolioDataSlice.reducer;
export { portfolio }