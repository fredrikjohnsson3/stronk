import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    setAccessToken,
    setTokenExpiryDate,
} from '../state/reducers/authSlice';

interface AccessToken {
    access_token: string;
    expires_in: number;
}
type BnetAuthRes = AccessToken;

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIR_URI = 'http://localhost:3000';

const b64credentials = window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
const scopes = ['wow.profile'];

export const battleNetApi = createApi({
    reducerPath: 'battleNetApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '',
    }),
    endpoints: (builder) => ({
        getAccessToken: builder.query<BnetAuthRes, string>({
            query: (authCode) => {
                return {
                    url: `https://oauth.battle.net/token?redirect_uri=${REDIR_URI}&scope=${scopes.join(
                        '%20'
                    )}&grant_type=client_credentials&code=${authCode}`,
                    method: 'POST',
                    headers: { authorization: `Basic ${b64credentials}` },
                };
            },
            async onQueryStarted(authCode, { dispatch, queryFulfilled }) {
                try {
                    const accessToken = (await queryFulfilled).data
                        .access_token;
                    const expiresIn = (await queryFulfilled).data.expires_in;
                    dispatch(setAccessToken(accessToken));
                    dispatch(setTokenExpiryDate(expiresIn));
                } catch (error) {}
            },
        }),
    }),
});

export const { useGetAccessTokenQuery } = battleNetApi;
