import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface BlizzardApi {
    realmSlug: string;
    characterName: string;
    endpoint: string;
}

interface ProfessionResponse {
    body: {
        primaries: {};
        secondaries: {};
    };
}

interface Primaries {}

const API_URL = 'https://eu.api.blizzard.com/';

const accessToken = process.env.STRONK_APP_ACCESS_TOKEN || '';

export const blizzardApi = createApi({
    reducerPath: 'blizzardApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getAchievementById: builder.query<BaseQueryApi, BlizzardApi>({
            query: ({ realmSlug, characterName, endpoint }) => ({
                url: `profile/wow/character/${realmSlug}/${characterName}/${endpoint}`,
                method: 'GET',
                prepareHeaders: (headers: Headers) => {
                    headers.set('authorization', `Bearer ${accessToken}`);
                },
            }),
            // transformResponse: (res) => res.data,
            transformErrorResponse: (err) => err.data,
        }),

        getProfessionSummary: builder.query<BaseQueryApi, BlizzardApi>({
            query: ({ realmSlug, characterName, endpoint }) => ({
                url: `profile/wow/character/${realmSlug}/${characterName}/${endpoint}`,
                method: 'GET',
                prepareHeaders: (headers: Headers) => {
                    headers.set('authorization', `Bearer ${accessToken}`);
                },
            }),
            // transformResponse: (res) => {
            // if (!res.body.primaries) {
            //     throw Error;
            // } else {
            //     const primaries = res.body.primaries;
            //     const secondaries = res.body.secondaries;
            //     let professionData = {
            //         primaries: {},
            //         secondaries: {},
            //     };

            //     for (i in primaries) {
            //         professionData.primaries[primaries[i].]
            //     }

            // }
            // },
            transformErrorResponse: (err) => err.data,
        }),
    }),
});

export const { useGetAchievementByIdQuery } = blizzardApi;
