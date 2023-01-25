import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthorizationState {
    loggedIn: boolean;
    authCode: string;
    accessToken: string;
    tokenExpiryDate: string;
}

const initialState: AuthorizationState = {
    loggedIn: false,
    authCode: '',
    accessToken: '',
    tokenExpiryDate: '',
};

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
        setAuthCode: (state, action: PayloadAction<string>) => {
            state.authCode = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setTokenExpiryDate: (state, action: PayloadAction<number>) => {
            const date = new Date();
            date.setSeconds(date.getSeconds() + action.payload);
            state.tokenExpiryDate = date.toLocaleString();
        },
    },
});

export const { setLoggedIn, setAuthCode, setAccessToken, setTokenExpiryDate } =
    authorizationSlice.actions;

export const selectIsLoggedIn = (state: RootState) =>
    state.authorization.loggedIn;
export const selectAuthCode = (state: RootState) =>
    state.authorization.authCode;
export const selectAccessToken = (state: RootState) =>
    state.authorization.accessToken;
export const selectTokenExpiryDate = (state: RootState) =>
    state.authorization.tokenExpiryDate;

export default authorizationSlice.reducer;
