export type Scalars = {
  ID: string;
};

export type Transaction = {
  id: string;
  title: string;
  description: string;
  amount: number;
};

export type GetAllTransactionsResponse = {
  transactions: Transaction[];
};

export type GetAllTransactionsInput = {
  id: Scalars['ID'];
  title: string;
  description: string;
  amount: number;
};
