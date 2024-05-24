import { BaseQueryApi, FetchArgs, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { login, logout } from "./authSlice";
import { redirect } from "react-router-dom";

const BASE_URL = "http://localhost:4000";
// const BASE_URL = "http://bullseye.local:4000";

const fetchClient = async (args: FetchArgs, api: BaseQueryApi) => {
	try {
		let passedHeaders = args.headers;
		let headers: Headers | any = {
			...passedHeaders
		}
		let options: any = {
			method: args.method ? args.method : "GET",
			headers: headers as Headers,
			body: JSON.stringify(args.body),
		}
		if(args.body instanceof FormData) {
			console.log("Body is Form data");
			options["body"] = args.body
		} else {
			console.log("Body is json");
			headers['Content-Type'] = "application/json";
		}
		let response = await fetch(BASE_URL + args.url, options);
		if (response.ok) {
			return response.json();
		} else {
			if(response.status === 401 || response.status === 403) {
				api.dispatch(logout());
				redirect("/login");
			}
			throw Error("Authentication failed");
		}
	} catch (error) {
		console.error("Error in http call:", error);
	}
}

const customBaseQuery = async (
	{ body, variables }: { body?: string | FormData, variables?: any },
	api: BaseQueryApi
) => {
	try {

		console.log("body is formdata:", body instanceof FormData);

		let token: string = (api.getState() as RootState).auth.token;
		if (!token) {
			let localToken: string | null = localStorage.getItem('token');
			if (localToken && localToken !== null) {
				token = localToken;
				api.dispatch(login({ token: localToken }));
			}
		}
		let headers = {
			"Authorization": `Bearer ${token}`
		}

		let args: FetchArgs = {
			url: variables.url,
			body: body,
			method: variables.method,
			mode: "no-cors",
			headers: {
				...headers
			},
			credentials: "include"
		}

		let result = await fetchClient(args, api);
		return { data: result };
	} catch (error: any | Error) {
		console.log("Error occurred while getting api response:", error);
		return { error: { status: error.response.status, data: error } };
	}
}

export const baseApi = createApi({
	baseQuery: customBaseQuery,
	reducerPath: 'baseApi',
	tagTypes: ["Files"],
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				body: { ...credentials },
				variables: {
					url: '/login',
					method: 'POST'
				}
			})
		}),
		files: builder.query({
			query: () => ({
				variables: {
					url: '/files',
					method: 'GET'
				}
			}),
			providesTags: ['Files']
		}),
		uploadFiles: builder.mutation({
			query: (body: FormData) => ({
				body: body,
				variables: {
					url: '/upload/file',
					method: 'POST'
				}
			}),
			invalidatesTags: ['Files']
		}),
		createDIrectory: builder.mutation({
			query: (dirname) => ({
				body: dirname,
				variables: {
					url: '/create/directory',
					method: 'POST'
				}
			}),
			invalidatesTags: ['Files']
		}),
		delete: builder.mutation({
			query: (path) => ({
				body: path,
				variables: {
					url: '/delete',
					method: 'POST'
				}
			}),
			invalidatesTags: ['Files']
		}),
	}),
});

export const { useLoginMutation, useFilesQuery, useUploadFilesMutation, useCreateDIrectoryMutation, useDeleteMutation } = baseApi;
