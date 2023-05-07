import { getAllTransactions } from "../services/apis";
import React, {  } from "react";
import { Transaction } from "../types/transaction";

export default function Main() {

    const initTrans: Transaction[] = [];

    const [transactions, setTransactions] = React.useState(initTrans);

    React.useEffect(() => {
        getAllTransactions().then((allTransactions) => {
            console.log("result", allTransactions);
            let tr: Transaction[] = allTransactions.transactions;
            setTransactions(tr);
        });
    }, []);

    React.useEffect(() => {
        console.log("state: ", transactions)
    }, [transactions]);

    const trans:any = () => {
        if (transactions.length) {
            {
                transactions.map((transaction) => {
                  return  <li>{transaction.title}</li>
                })
            }
        }
        return null;
    }

    return (
        <>
            <div>Transactions</div>
            <ul>
                {trans}
            </ul>
        </>
    );
}
