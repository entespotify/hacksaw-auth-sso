import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../customBaseQuery";

export const appsApi = createApi({
	baseQuery: customBaseQuery,
	reducerPath: 'appsApi',
	tagTypes: ["Apps"],
	endpoints: (builder) => ({
		apps: builder.query({
			query: (path: string) => ({
				variables: {
					url: '/files',
					method: 'GET',
					params: {
						path: path
					}
				}
			}),
			providesTags: ['Apps']
		})
	}),
});

export const { useAppsQuery} = appsApi;
