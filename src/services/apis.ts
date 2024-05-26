import { BaseQueryApi, FetchArgs, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { login, logout } from "./authSlice";
import { redirect } from "react-router-dom";
import { UploadRequestType } from "../types/file";

// const BASE_URL = "http://localhost:4000";
const BASE_URL = "http://bullseye.local:4000";

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

		if(args.params) {
			console.log("setting params:", args.params)
			args.url = args.url + "?path=" + args.params.path
		}

		if(args.body instanceof FormData) {
			options["body"] = args.body
		} else {
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

		if(variables.url === "/files") {
			console.log("setting query param for request:", (api.getState() as RootState).files.path);
			variables.params.path = variables.params.path ? variables.params.path : (api.getState() as RootState).files.path
		}

		let args: FetchArgs = {
			url: variables.url,
			body: body,
			method: variables.method,
			params: variables.params,
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
			query: (path: string) => ({
				variables: {
					url: '/files',
					method: 'GET',
					params: {
						path: path
					}
				}
			}),
			providesTags: ['Files']
		}),
		uploadFiles: builder.mutation({
			query: (uploadType: UploadRequestType) => ({
				body: uploadType.body,
				variables: {
					url: '/upload/file',
					method: 'POST',
					params: {
						path: uploadType.path
					}
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
