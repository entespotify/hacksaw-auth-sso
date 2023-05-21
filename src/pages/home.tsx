import { FC, useEffect, useState } from "react";
import { Transaction } from "../types/transaction";
import { useGetAllTransactionsQuery } from "../services/apis";
import AddEditTransactionForm from "../components/add-transaction-form/AddEditTransactionForm";

const Home: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [editTransaction, setEditTransaction] = useState<Transaction>();

  const handleEditClick = (id: string) => {
    setEdit(true);
    setEditTransaction(transactions.find((t)=>t.id===id))
  };
console.log(editTransaction)
  const trans: any = () => {
    if (transactions.length > 0) {
      return transactions.map((transaction) => (
        <div style={{display: "flex"}}>
          <li>{transaction.title}</li>
          <button type="submit" onClick={()=>handleEditClick(transaction.id)}>
            Edit
          </button>
        </div>
      ));
    }
  };

  const allTransactions = useGetAllTransactionsQuery();

  useEffect(() => {
    if (allTransactions.data)
      setTransactions(allTransactions.data.transactions);
  }, [allTransactions]);

  return (
    <>
      <div>Transactions</div>
      <ul>{trans()}</ul>
      <label>
        Add new transaction:
        <AddEditTransactionForm isEdit={isEdit} transactions={editTransaction}/>
      </label>
    </>
  );
};

export default Home;
