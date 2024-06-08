import { createApi } from "@reduxjs/toolkit/query/react";
import { TransferRequestType, UploadRequestType } from "../../types/file";
import customBaseQuery from "../customBaseQuery";


export const filesApi = createApi({
	baseQuery: customBaseQuery,
	reducerPath: 'filesApi',
	tagTypes: ["Files"],
	endpoints: (builder) => ({
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

export const {
	useFilesQuery,
	useUploadFilesMutation,
	useCreateDIrectoryMutation,
	useCopyMutation,
	useMoveMutation,
	useDeleteMutation
} = filesApi;
