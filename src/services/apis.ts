import { GraphQLClient } from "graphql-request";
import { GET_TRANSACTIONS_QUERY } from "./queries";
import { GetAllTransactionsResponse } from "../types/transaction";

const endpoint = "http://localhost:4000/";

const graphQLClient = new GraphQLClient(endpoint);

export const getAllTransactions = async () => {
  const allTransactions: GetAllTransactionsResponse = await graphQLClient.request(GET_TRANSACTIONS_QUERY);
  return allTransactions;
};
