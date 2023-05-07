export type Transaction = {
    id: String;
    title: String;
    description: String;
    amount: Number;
}

export type GetAllTransactionsResponse = {
    transactions: Transaction[]
}