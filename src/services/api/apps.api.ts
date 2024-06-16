import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../customBaseQuery";
import { UploadRequestType, TransferRequestType } from "../../types/file";

export const appsApi = createApi({
	baseQuery: customBaseQuery,
	reducerPath: 'appsApi',
	tagTypes: ["Apps"],
	endpoints: (builder) => ({
		apps: builder.query({
			query: (path: string) => ({
				variables: {
					url: '/web/files',
					method: 'GET',
					params: {
						path: path
					}
				}
			}),
			providesTags: ['Apps']
		}),
		uploadFiles: builder.mutation({
			query: (uploadType: UploadRequestType) => ({
				body: uploadType.body,
				variables: {
					url: '/web/upload/file',
					method: 'POST',
					params: {
						path: uploadType.path
					}
				}
			}),
			invalidatesTags: ['Apps']
		}),
		createDIrectory: builder.mutation({
			query: (dirname) => ({
				body: dirname,
				variables: {
					url: '/web/create/directory',
					method: 'POST'
				}
			}),
			invalidatesTags: ['Apps']
		}),
		copy: builder.mutation({
			query: (params: TransferRequestType) => ({
				body: params,
				variables: {
					url: '/web/copy',
					method: 'POST'
				}
			}),
			invalidatesTags: ['Apps']
		}),
		move: builder.mutation({
			query: (params: TransferRequestType) => ({
				body: params,
				variables: {
					url: '/web/move',
					method: 'POST'
				}
			}),
			invalidatesTags: ['Apps']
		}),
		delete: builder.mutation({
			query: (path) => ({
				body: path,
				variables: {
					url: '/web/delete',
					method: 'POST'
				}
			}),
			invalidatesTags: ['Apps']
		}),
	}),
});

export const { useAppsQuery, useCopyMutation, useMoveMutation, useUploadFilesMutation, useCreateDIrectoryMutation, useDeleteMutation } = appsApi;
