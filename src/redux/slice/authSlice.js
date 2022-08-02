import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            isLoggedIn: false,
            error: false,
        }
    },
    reducers: {
        login: (state) => {
            state.login.isFetching = true;
            state.login.error = false;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.login.isLoggedIn = true;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.isLoggedIn = false;
            state.login.error = true;
        },
        logout: (state) => {
            state.login.isLoggedIn = false;
            state.login.error = false;
            state.login.currentUser = null;
        },
    },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
