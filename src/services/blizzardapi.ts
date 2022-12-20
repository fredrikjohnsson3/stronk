import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface BlizzardApi {
    realm: string;
    name: string;
    endpoint: string;
}

const API_URL = 'https://eu.api.blizzard.com/';

const accessToken = '';

export const blizzardApi = createApi({
    reducerPath: 'battleNetApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getAchievementById: builder.query<BaseQueryApi, BlizzardApi>({
            query: ({ realm, name, endpoint }) => ({
                url: `profile/wow/character/${realm}/${name}/${endpoint}`,
                method: 'GET',
                prepareHeaders: (headers: Headers) => {
                    headers.set('authorization', accessToken);
                },
                payload: {
                    grant_type: 'client_credentials',
                },
            }),
        }),
    }),
});

export const { useGetAchievementByIdQuery } = blizzardApi;
