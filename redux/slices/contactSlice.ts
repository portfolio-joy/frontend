import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../rootInitialState";
import { ContactType } from "@/types/ContactType";

const contactSlice = createSlice({
    name: 'contact',
    initialState: userInitialState,
    reducers: {
        saveContactRequest(state, action: PayloadAction<{ data: ContactType, token: string }>) {
            state.success = false;
        },
        updateContactRequest(state, action: PayloadAction<{ data: ContactType, contactId: string, token: string }>) {
            state.success = false;
        },
        contactSuccess(state, action: PayloadAction<ContactType>) {
            state.success = true;
            if (state.user) state.user.contact = action.payload;
        },
        contactFaliure(state) {
            state.success = false;
        }
    }
});

export const { saveContactRequest, updateContactRequest, contactSuccess, contactFaliure } = contactSlice.actions;
export default contactSlice.reducer;
