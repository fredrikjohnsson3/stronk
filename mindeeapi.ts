import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://api.mindee.net/v1/products/mindee';

export const mindeeApi = createApi({
    reducerPath: 'mindeeApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getInvoicesRead: builder.query<BaseQueryApi, File>({
            query: (body) => ({
                url: '/invoices/v3/predict',
                method: 'POST',
                prepareHeaders: (headers: Headers) => {
                    headers.set(
                        'authorization',
                        'Token 1086a2224e1219329d1ac30f75140d46'
                    );
                },
                body,
            }),
        }),
    }),
});

export const { useGetInvoicesReadQuery } = mindeeApi;
