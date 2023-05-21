import { createApi } from "@reduxjs/toolkit/query/react";
import request, { ClientError } from "graphql-request";
import type {
  GetAllTransactionsInput,
  GetAllTransactionsResponse,
} from "../types/transaction";
import { ADD_NEW_TRANSACTIONS_MUTATION } from "./mutations";
import { GET_TRANSACTIONS_QUERY } from "./queries";

const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body, variables }: { body: string, variables?: any }) => {
    try {
      const result = await request(baseUrl, body, variables);
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } };
      }
      return { error: { status: 500, data: error } };
    }
  };

export const baseApi = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),
  reducerPath: 'baseApi',
  tagTypes: ["AllTransactions"],
  endpoints: (builder) => ({
    getAllTransactions: builder.query<GetAllTransactionsResponse, void>({
      query: () => ({
        body: GET_TRANSACTIONS_QUERY,
      }),
      providesTags: ["AllTransactions"],
      transformResponse: (response: GetAllTransactionsResponse) => response,
    }),
    addNewTransaction: builder.mutation<GetAllTransactionsResponse, GetAllTransactionsInput>({
      query: (variables) => ({
        body: ADD_NEW_TRANSACTIONS_MUTATION,
        variables,
      }),
      invalidatesTags: ["AllTransactions"],
    }),
  }),
  
});

export const { useGetAllTransactionsQuery, useAddNewTransactionMutation } = baseApi;
