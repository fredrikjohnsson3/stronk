import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface BattleNetApi {
    payload: string;
}

const API_URL = 'https://eu.battle.net/';

const credentials = Buffer.from(
    'e4557bc3c57f46be852b3dec45563982:Pu5vJkrM67ZnlRdkizN08I3lwdCWcwgG'
);

export const battleNetApi = createApi({
    reducerPath: 'battleNetApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getAccessToken: builder.query<BaseQueryApi, BattleNetApi>({
            query: ({ payload }) => ({
                url: 'oauth/token',
                method: 'GET',
                prepareHeaders: (headers: Headers) => {
                    headers.set(
                        'authorization',
                        `Basic ${credentials.toString('base64')}`
                    );
                },
                payload: {
                    grant_type: 'client_credentials',
                },
            }),
        }),
    }),
});

export const { useGetAccessTokenQuery } = battleNetApi;
