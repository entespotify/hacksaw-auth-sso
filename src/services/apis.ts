import { BaseQueryApi, FetchArgs, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { login, logout } from "./authSlice";
import { TransferRequestType, UploadRequestType } from "../types/file";

const BASE_URL = "http://localhost:4000";
// const BASE_URL = "http://bullseye.local:4000";

const fetchClient = async (args: FetchArgs) : Promise<Response> => {
	let response: Response = new Response();
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
		response = await fetch(BASE_URL + args.url, options);
	} catch (error) {
		console.error("Error in http call:", error);
	}
	return response;
}

const customBaseQuery = async (
	{ body, variables }: { body?: string | FormData | object, variables?: any },
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

		let result;
		let response = await fetchClient(args);
		if (response.ok) {
			result = response.json();
		} else {
			if(response.status === 401 || response.status === 403) {
				api.dispatch(logout());
				//done in a dirty way till we figure out a better way to redirect to login
				window.location.reload();
			}
		}
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
		copy: builder.mutation({
			query: (params: TransferRequestType) => ({
				body: params,
				variables: {
					url: '/copy',
					method: 'POST'
				}
			}),
			invalidatesTags: ['Files']
		}),
		move: builder.mutation({
			query: (params: TransferRequestType) => ({
				body: params,
				variables: {
					url: '/move',
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

export const { useLoginMutation, useFilesQuery, useUploadFilesMutation, useCreateDIrectoryMutation, useCopyMutation, useMoveMutation, useDeleteMutation } = baseApi;
