import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../customBaseQuery";


export const authApi = createApi({
	baseQuery: customBaseQuery,
	reducerPath: 'authApi',
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				body: { ...credentials },
				variables: {
					url: '/api/token/',
					method: 'POST'
				}
			})
		})
	}),
});

export const { useLoginMutation } = authApi;
